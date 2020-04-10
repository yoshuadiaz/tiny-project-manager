require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config')
const rootComponent = require('./components/root/network')
const userRoutes = require('./components/user/network')
const authRoutes = require('./components/auth/network')

const app = express()

app.use(bodyParser.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use('/', rootComponent)

app.listen(config.api.port, () => {
  console.log(`API listen on port: http://localhost:${config.api.port}`)
})
