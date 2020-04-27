const passport = require('passport')
const boom = require('@hapi/boom')
const CookieStrategy = require('passport-cookie')
const config = require('../../config')
const authService = require('../../api/components/auth')
const { verify } = require('jsonwebtoken')

passport.use(new CookieStrategy(
  async function (token, cb) {
    try {
      const userData = await verify(token, config.jwt.secret)
      const user = await authService.get({ email: userData.email })

      if (!user || user.isBloqued) {
        return (boom.unauthorized(), null)
      }
      return cb(null, {
        id: user.id,
        email: user.email,
        company_id: user.company_id
      })
    } catch (error) {
      return cb(boom.unauthorized(), null)
    }
  }
))
