const TABLE = 'client'

module.exports = (
  store = require('../../../store/dummy')
) => {
  // ToDo List by Company
  async function list () {
    const clients = await store.list(TABLE)
    return clients
  }

  async function get (id) {
    return store.get(TABLE, id)
  }

  async function insert (client, user) {
    return store.insert(TABLE, {
      ...client,
      company_id: user.company_id,
      created_by: user.id
    })
  }

  async function update (id, client) {
    return store.update(TABLE, id, client)
  }

  return {
    list,
    get,
    insert,
    update
  }
}
