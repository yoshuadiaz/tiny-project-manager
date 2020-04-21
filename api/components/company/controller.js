const TABLE = 'company'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function get (id) {
    return store.get(TABLE, id)
  }

  async function list (user) {
    return store.query(TABLE, {
      company_id: user.company_id
    })
  }

  async function insert (company) {
    return store.insert(TABLE, company)
  }

  async function update (id, company) {
    return store.update(TABLE, id, company)
  }

  return {
    get,
    list,
    insert,
    update
  }
}
