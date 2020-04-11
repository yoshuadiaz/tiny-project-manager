const TABLE = 'company'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function get (id) {
    return store.get(TABLE, id)
  }

  async function insert (company) {
    return store.insert(TABLE, company)
  }

  async function update (id, company) {
    return store.update(TABLE, id, company)
  }

  return {
    get,
    insert,
    update
  }
}
