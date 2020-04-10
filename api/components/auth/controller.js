const bcrypt = require('bcrypt')

const TABLE = 'auth'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function insert (data) {
    const user = {
      id: data.id,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      isBloqued: false,
      isConfirmed: false,
      resetToken: null,
      confirmationToken: null
    }

    return store.insert(TABLE, user)
  }

  return {
    insert
  }
}
