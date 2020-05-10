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

  async function insert (company, trx) {
    return store.insert(TABLE, company, trx)
  }

  return {
    list,
    me,
    insert
  }
}
