const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.jwt.secret

async function sign (data) {
  delete data.password
  delete data.isBloqued
  delete data.isConfirmed
  delete data.resetToken
  delete data.confirmationToken
  return jwt.sign(data, secret, {
    expiresIn: '90m'
  })
}

module.exports = {
  sign
}
