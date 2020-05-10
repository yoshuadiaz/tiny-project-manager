const express = require('express')
const router = express.Router()

const response = require('../../../network/response')
const Controller = require('./index')

// JWT Strategy
require('../../../auth/strategies/jwt')

router.get('/', list)
router.get('/me', me)

function me (req, res, next) {
  Controller.me(req.user.id)
    .then(me => response.success(req, res, me, 200))
    .catch(next)
}

function list (req, res, next) {
  Controller.list(req.user)
    .then(list => response.success(req, res, list, 200))
    .catch(next)
}

module.exports = router
