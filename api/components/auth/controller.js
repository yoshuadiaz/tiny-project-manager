const bcrypt = require('bcrypt')
const auth = require('../../../auth/')

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
      confirmationToken: null,
      company_id: data.company_id
    }

    return store.insert(TABLE, user)
  }

  async function login (email, password) {
    const user = await store.query(TABLE, { email })

    if (!user.isBloqued) {
      return bcrypt.compare(password, user.password)
        .then(async isLogged => {
          if (isLogged) {
            return auth.sign({ ...user })
          } else {
            throw new Error('Invalid info')
          }
        })
    }

    throw new Error('invalid info')
  }

  return {
    insert,
    login
  }
}
