const bcrypt = require('bcrypt')
const auth = require('../../../auth/')

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

  return {
    insert,
    get,
    token
  }
}
