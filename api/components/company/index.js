const { dbMotor } = require('../../../config')
const store = require(`../../../store/${dbMotor}`)
const ctrl = require('./controller')

module.exports = ctrl(store)
