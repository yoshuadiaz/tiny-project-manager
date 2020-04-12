const TABLE = 'user'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list () {
    const users = await store.list(TABLE)
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
