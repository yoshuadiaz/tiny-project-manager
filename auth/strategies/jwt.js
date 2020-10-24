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

      return cb(null, {
        id: user.id,
        email: user.id,
        company_id: user.company_id
      })
    } catch (error) {
      return cb(boom.unauthorized(), false)
    }
  })
)
