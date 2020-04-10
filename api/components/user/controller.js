const auth = require('../auth')

const TABLE = 'user'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list () {
    const users = await store.list(TABLE)
    return users
  }
  async function register (body) {
    const user = {
      first_name: body.first_name,
      last_name: body.first_name,
      email: body.email
    }
    const savedUser = await store.insert(TABLE, user)

    await auth.insert({ ...savedUser, password: body.password })

    return true
  }

  return {
    list,
    register
  }
}
