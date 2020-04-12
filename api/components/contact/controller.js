const TABLE = 'contact'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list () {
    const contacts = await store.list(TABLE)
    return contacts
  }

  async function get (id) {
    return store.get(TABLE, id)
  }

  async function insert (contact) {
    return store.insert(TABLE, contact)
  }

  async function update (id, contact) {
    return store.update(TABLE, id, contact)
  }

  return {
    list,
    get,
    insert,
    update
  }
}
