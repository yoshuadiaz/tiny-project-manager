require('dotenv').config()

module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  postgresql: {
    host: process.env.POSTGRES_HOST || '',
    user: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || '',
    port: process.env.POSTGRES_PORT || ''
  },
  dbMotor: process.env.DB_MOTOR || 'dummy'
}
