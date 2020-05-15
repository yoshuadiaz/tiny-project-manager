const express = require('express')
const router = express.Router()

const response = require('../../../network/response')
const Controller = require('./index')

router.get('/', list)
router.get('/me', me)
router.put('/:id', updateUser)

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

function updateUser (req, res, next) {
  Controller.update(req.user, req.params.id, req.body)
    .then(result => response.success(req, res, result, 200))
    .catch(next)
}

module.exports = router
