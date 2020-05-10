const bcrypt = require('bcrypt')
const auth = require('../../../auth/')
const companyCtrl = require('../company')
const userCtrl = require('../user')
const boom = require('@hapi/boom')

const TABLE = 'auth'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function get (q) {
    const user = await store.query(TABLE, q)

    return user[0]
  }

  async function insert (data, trx) {
    const user = {
      id: data.id,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      is_bloqued: false,
      is_confirmed: false,
      reset_token: null,
      confirmation_token: null,
      company_id: data.company_id
    }

    return store.insert(TABLE, user, trx)
  }

  async function token (user) {
    return auth.sign({ ...user })
  }

  async function register (body) {
    const trx = await store.transaction()

    try {
      const companySaved = await companyCtrl.insert(body.company, trx)

      const user = {
        first_name: body.user.first_name,
        last_name: body.user.last_name,
        email: body.user.email,
        company_id: companySaved.id,
        salary: body.user.salary,
        currency: body.user.currency,
        work_type_id: body.user.work_type_id
      }

      const savedUser = await userCtrl.insert({
        ...user,
        status_id: '27ed4728-936e-43c2-a850-c6034ab5d1d2'
      }, trx)

      delete user.first_name
      delete user.last_name
      delete user.status_id
      delete user.salary
      delete user.currency
      delete user.work_type_id

      await insert({ ...user, id: savedUser.id, password: body.user.password }, trx)
      await trx.commit()
      return true
    } catch (error) {
      await trx.rollback()
      console.error('ERROR: ', error)
      throw new Error(boom.badData())
    }
  }

  return {
    insert,
    get,
    token,
    register
  }
}
