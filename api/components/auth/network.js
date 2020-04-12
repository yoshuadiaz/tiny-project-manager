const express = require('express')
const response = require('../../../network/response')
const Controller = require('./index')
const passport = require('passport')
const router = express.Router()

// Basic Strategy
require('../../../auth/strategies/basic')

router.post('/login', passport.authenticate('basic', { session: false }), token)
router.post('/register', register)

function token (req, res) {
  Controller.token(req.user)
    .then(token => response.success(req, res, token, 200))
    .catch(() => response.error(req, res, 'Invalid information', 400))
}

function register (req, res) {
  Controller.register(req.body)
    .then(status => response.success(req, res, status, 200))
    .catch(() => response.error(req, res, 'Invalid information', 400))
}

module.exports = router
