const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const boom = require('@hapi/boom')

const config = require('../../config')
const authService = require('../../api/components/auth')

passport.use(
  new Strategy({
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async (tokenPayload, cb) => {
    try {
      const user = await authService.get({ email: tokenPayload.email })

      if (!user || user.isBloqued) {
        return cb(boom.unauthorized(), false)
      }

      delete user.password
      delete user.isBloqued
      delete user.isConfirmed
      delete user.resetToken
      delete user.confirmationToken

      return cb(null, { ...user })
    } catch (error) {
      return cb(boom.unauthorized(), false)
    }
  })
)
