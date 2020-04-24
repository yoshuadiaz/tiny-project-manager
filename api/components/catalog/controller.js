const GenderTable = 'gender'
const ProjectStatusTable = 'status_project'
const UserStatusTable = 'status_user'
const WorkTypeTable = 'work_type'

module.exports = (
  store = require('../../../store/dummy')
) => {
  async function gender () {
    return store.list(GenderTable)
  }
  async function projectStatus () {
    return store.list(ProjectStatusTable)
  }
  async function userStatus () {
    return store.list(UserStatusTable)
  }
  async function workType () {
    return store.list(WorkTypeTable)
  }

  return {
    gender,
    projectStatus,
    userStatus,
    workType
  }
}
