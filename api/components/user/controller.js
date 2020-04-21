const TABLE = 'user'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list (user) {
    const users = await store.query(TABLE, { company_id: user.company_id })
    return users
  }

  async function insert (company) {
    return store.insert(TABLE, company)
  }

  return {
    list,
    insert
  }
}
