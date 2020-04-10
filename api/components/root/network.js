const express = require('express')
const router = express.Router()

router.get('/', welcome)

function welcome (req, res) {
  res.send('Welcome to the Tiny Project Manager API Project')
}

module.exports = router
