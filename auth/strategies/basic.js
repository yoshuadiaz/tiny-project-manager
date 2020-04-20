const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const authService = require('../../api/components/auth')

passport.use(new BasicStrategy(async (email, password, cb) => {
  try {
    const user = await authService.get({ email })
    if (!user || user.isBloqued) {
      return cb(boom.unauthorized(), false)
    }

    const isValidLogin = await bcrypt.compare(password, user.password)

    if (!isValidLogin) {
      return cb(boom.unauthorized(), false)
    }

    delete user.password
    delete user.is_bloqued
    delete user.is_confirmed
    delete user.reset_token
    delete user.confirmation_token
    delete user.created_at
    delete user.updated_at

    return cb(null, user)
  } catch (error) {
    return cb(error)
  }
}))
