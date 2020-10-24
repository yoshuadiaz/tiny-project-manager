require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const config = require('../config')
const rootComponent = require('./components/root/network')
const userRoutes = require('./components/user/network')
const authRoutes = require('./components/auth/network')
const projectRoutes = require('./components/project/network')
const clientRoutes = require('./components/client/network')
const contactRoutes = require('./components/contact/network')
const companyRoutes = require('./components/company/network')
const catalogRoutes = require('./components/catalog/network')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))

// JWT Strategy
require('../auth/strategies/jwt')

app.use('/api/auth', authRoutes)
app.use('/api/user', passport.authenticate(['cookie', 'jwt'], { session: false }), userRoutes)
app.use('/api/project', passport.authenticate(['cookie', 'jwt'], { session: false }), projectRoutes)
app.use('/api/contact', passport.authenticate(['cookie', 'jwt'], { session: false }), contactRoutes)
app.use('/api/client', passport.authenticate(['cookie', 'jwt'], { session: false }), clientRoutes)
app.use('/api/company', passport.authenticate(['cookie', 'jwt'], { session: false }), companyRoutes)
app.use('/api/catalog', catalogRoutes)

app.use('/', rootComponent)

app.listen(config.api.port, () => {
  console.log(`API listen on port: http://localhost:${config.api.port}`)
})
