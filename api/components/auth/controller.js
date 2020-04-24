const bcrypt = require('bcrypt')
const auth = require('../../../auth/')
const companyCtrl = require('../company')
const userCtrl = require('../user')

const TABLE = 'auth'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function get (q) {
    const user = await store.query(TABLE, q)

    return user[0]
  }

  async function insert (data) {
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

    return store.insert(TABLE, user)
  }

  async function token (user) {
    return auth.sign({ ...user })
  }

  async function register (body) {
    const companySaved = await companyCtrl.insert(body.company)

    const user = {
      first_name: body.user.first_name,
      last_name: body.user.first_name,
      email: body.user.email,
      company_id: companySaved.id,
      salary: body.user.salary,
      currency: body.user.currency,
      work_type_id: body.user.work_type_id
    }

    const savedUser = await userCtrl.insert({
      ...user,
      status_id: '27ed4728-936e-43c2-a850-c6034ab5d1d2'
    })

    delete user.first_name
    delete user.last_name
    delete user.status_id
    delete user.salary
    delete user.currency
    delete user.work_type_id

    await insert({ ...user, id: savedUser.id, password: body.user.password })

    return true
  }

  return {
    insert,
    get,
    token,
    register
  }
}
