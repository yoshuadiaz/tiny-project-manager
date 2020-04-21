const express = require('express')
const router = express.Router()
const response = require('../../../network/response')
const Controller = require('./index')

router.get('/', get)
router.put('/', update)

function get (req, res, next) {
  Controller.get(req.user.company_id)
    .then(list => response.success(req, res, list, 200))
    .catch(next)
}

function update (req, res, next) {
  Controller.update(
    req.user.company_id,
    req.body
  )
    .then(updated => response.success(req, res, updated, 201))
    .catch(next)
}

module.exports = router
