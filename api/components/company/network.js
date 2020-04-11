const express = require('express')
const router = express.Router()

const response = require('../../../network/response')
const Controller = require('./index')

router.get('/', get)
router.put('/', update)

function get (req, res, next) {
  // ToDo get company by current user
}

function update (req, res, next) {
  // ToDo update company by current user
}

module.exports = router
