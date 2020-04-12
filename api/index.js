require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const config = require('../config')
const rootComponent = require('./components/root/network')
const userRoutes = require('./components/user/network')
const authRoutes = require('./components/auth/network')
const projectRoutes = require('./components/project/network')
const clientRoutes = require('./components/client/network')
const contactRoutes = require('./components/contact/network')
const companyRoutes = require('./components/company/network')

const app = express()

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cors())

// JWT Strategy
require('../auth/strategies/jwt')

app.use('/api/auth', authRoutes)
app.use('/api/user', passport.authenticate('jwt', { session: false }), userRoutes)
app.use('/api/project', passport.authenticate('jwt', { session: false }), projectRoutes)
app.use('/api/contact', passport.authenticate('jwt', { session: false }), contactRoutes)
app.use('/api/client', passport.authenticate('jwt', { session: false }), clientRoutes)
app.use('/api/company', passport.authenticate('jwt', { session: false }), companyRoutes)

app.use('/', rootComponent)

app.listen(config.api.port, () => {
  console.log(`API listen on port: http://localhost:${config.api.port}`)
})
