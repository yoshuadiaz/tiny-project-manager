const express = require('express')
const router = express.Router()

const response = require('../../../network/response')
const Controller = require('./index')

router.get('/', list)
router.get('/:id', get)
router.post('/', insert)
router.put('/:id', update)

// ToDo Add list by company
function list (req, res, next) {
  Controller.list()
    .then(list => response.success(req, res, list, 200))
    .catch(next)
}

function get (req, res, next) {
  Controller.get(req.params.id)
    .then(project => response.success(req, res, project, 200))
    .catch(next)
}

function insert (req, res, next) {
  Controller.insert(req.body, req.user)
    .then(project => response.success(req, res, project, 201))
    .catch(next)
}

function update (req, res, next) {
  Controller.update(req.params.id, req.body)
    .then(project => response.success(req, res, project, 201))
    .catch(next)
}

module.exports = router
