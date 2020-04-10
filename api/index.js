require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config')
const rootComponent = require('./components/root/network')

const app = express()

app.use(bodyParser.json())

app.use('/', rootComponent)

app.listen(config.api.port, () => {
  console.log(`API listen on port: http://localhost:${config.api.port}`)
})
