const TABLE = 'project'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function list () {
    const projects = await store.list(TABLE)
    return projects
  }

  async function get (id) {
    return store.get(TABLE, id)
  }

  async function insert (project) {
    return store.insert(TABLE, project)
  }

  async function update (id, project) {
    return store.update(TABLE, id, project)
  }

  return {
    list,
    get,
    insert,
    update
  }
}
