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
      company_id: companySaved.id
    }

    const savedUser = await userCtrl.insert(user)

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
