const passport = require('passport')
const express = require('express')
const router = express.Router()
const response = require('../../../network/response')
const Controller = require('./index')

router.get('/gender', gender)

router.get(
  '/project_status',
  passport.authenticate('jwt', { session: false }),
  projectStatus
)

router.get(
  '/user_status',
  passport.authenticate('jwt', { session: false }),
  userStatus
)

router.get('/work_type', workType)

function gender (req, res, next) {
  Controller.gender()
    .then(gender => response.success(req, res, gender, 200))
    .catch(next)
}
function projectStatus (req, res, next) {
  Controller.projectStatus()
    .then(projectStatus => response.success(req, res, projectStatus, 200))
    .catch(next)
}
function userStatus (req, res, next) {
  Controller.userStatus()
    .then(userStatus => response.success(req, res, userStatus, 200))
    .catch(next)
}
function workType (req, res, next) {
  Controller.workType()
    .then(workType => response.success(req, res, workType, 200))
    .catch(next)
}

module.exports = router
