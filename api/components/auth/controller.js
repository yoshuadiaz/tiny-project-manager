const bcrypt = require('bcrypt')
const auth = require('../../../auth/')
const companyCtrl = require('../company')
const userCtrl = require('../user')

const TABLE = 'auth'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function get (email) {
    return store.query(TABLE, { email })
  }

  async function insert (data) {
    const user = {
      id: data.id,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      isBloqued: false,
      isConfirmed: false,
      resetToken: null,
      confirmationToken: null,
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

    await insert({ ...savedUser, password: body.user.password })

    return true
  }

  return {
    insert,
    get,
    token,
    register
  }
}
