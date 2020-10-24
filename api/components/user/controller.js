const Boom = require('@hapi/boom')
const TABLE = 'user'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list (user) {
    const users = await store.query(TABLE, { company_id: user.company_id })
    return users
  }

  async function me (userId) {
    const user = await store.get(TABLE, userId)
    return user
  }

  async function insert (user, trx) {
    return store.insert(TABLE, user, trx)
  }

  async function update (authenticatedUser, id, data) {
    const user = await store.get(TABLE, id)
    delete data.email
    delete data.password
    delete data.company_id
    if (authenticatedUser.company_id === user.company_id) return store.update(TABLE, id, data)
    throw new Error(Boom.unauthorized())
  }

  return {
    list,
    me,
    insert,
    update
  }
}
