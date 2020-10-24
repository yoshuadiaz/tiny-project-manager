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

  async function insert (project, user) {
    return store.insert(TABLE, {
      ...project,
      company_id: user.company_id,
      created_by: user.id,
      status_id: '9f3b759b-8f52-49ea-bbfd-f06543d59af2'
    })
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
