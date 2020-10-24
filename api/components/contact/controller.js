const TABLE = 'contact'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list (clientId) {
    const contacts = await store.query(TABLE, { client_id: clientId })
    return contacts
  }

  async function get (clientId, id) {
    const [contact] = await store.query(TABLE, { client_id: clientId, id })
    return { ...contact }
  }

  async function insert (contact, user) {
    return store.insert(TABLE, {
      ...contact
    })
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
