const express = require('express')
const response = require('../../../network/response')
const Controller = require('./index')
const passport = require('passport')
const router = express.Router()

// Basic Strategy
require('../../../auth/strategies/basic')
require('../../../auth/strategies/cookie')

router.post('/login', passport.authenticate('basic', { session: false }), token)
router.post('/check', passport.authenticate('cookie', { session: false }), cookie)
router.post('/register', register)
router.post('/addUser', passport.authenticate(['cookie', 'jwt'], { session: false }), addUser)

function cookie (req, res) {
  const token = req.cookies.token

  response.success(req, res, { token, user: req.user }, 200)
}
function token (req, res) {
  Controller.token(req.user)
    .then(token => {
      res.cookie('token', token, { maxAge: 5400000, httpOnly: true })
      response.success(req, res, { token, user: req.user }, 200)
    })
    .catch(() => response.error(req, res, 'Invalid information', 400))
}

function register (req, res) {
  Controller.register(req.body)
    .then(status => response.success(req, res, status, 200))
    .catch(() => response.error(req, res, 'Invalid information', 400))
}
function addUser (req, res) {
  Controller.addUser(req.user, req.body)
    .then(status => response.success(req, res, status, 200))
    .catch(() => response.error(req, res, 'Invalid information', 400))
}

module.exports = router
