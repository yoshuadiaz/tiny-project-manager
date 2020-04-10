const express = require('express')
const router = express.Router()

const response = require('../../../network/response')
const Controller = require('./index')
router.get('/', list)
router.post('/', register)

function list (req, res, next) {
  Controller.list()
    .then(list => response.success(req, res, list, 200))
    .catch(next)
}

function register (req, res, next) {
  Controller.register(req.body)
    .then(user => response.success(req, res, user, 201))
    .catch(next)
}

module.exports = router
