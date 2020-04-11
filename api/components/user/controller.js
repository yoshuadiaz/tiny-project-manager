const auth = require('../auth')
const company = require('../company')

const TABLE = 'user'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list () {
    const users = await store.list(TABLE)
    return users
  }
  async function register (body) {
    const companySaved = await company.insert(body.company)
    const user = {
      first_name: body.user.first_name,
      last_name: body.user.first_name,
      email: body.user.email,
      company_id: companySaved.id
    }
    const savedUser = await store.insert(TABLE, user)

    await auth.insert({ ...savedUser, password: body.user.password })

    return true
  }

  return {
    list,
    register
  }
}
