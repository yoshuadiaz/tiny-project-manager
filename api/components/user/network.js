const express = require('express')
const router = express.Router()

const response = require('../../../network/response')
const Controller = require('./index')

// JWT Strategy
require('../../../auth/strategies/jwt')

router.get('/', list)

function list (req, res, next) {
  Controller.list()
    .then(list => response.success(req, res, list, 200))
    .catch(next)
}

module.exports = router
