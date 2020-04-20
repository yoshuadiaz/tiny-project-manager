
const { postgresql: { host, user, password, database, port } } = require('../config')

const dbConf = {
  host,
  user,
  password,
  database,
  port
}

const knex = require('knex')

let connection

async function handleConnection () {
  try {
    connection = knex({
      client: 'pg',
      connection: dbConf
    })
    console.log('DB Running')
  } catch (err) {
    console.error('[DB err]', err)
    setTimeout(handleConnection, 2000)
  }
}

handleConnection()

async function list (table) {
  return connection(table)
}
async function get (table, id) {
  return connection(table)
    .where({ id })
}
async function insert (table, data) {
  const [id] = await connection(table)
    .returning('id')
    .insert(data)

  const savedData = await connection(table).where({ id })

  return savedData[0]
}
async function update (table, data) {
  const id = data.id
  delete data.id
  return connection(table)
    .where({ id })
    .update(data)
}
async function query (table, query, join) {
  let dataFound

  if (join) {
    dataFound = await connection(table)
      .join(join)
      .where(query)
  } else {
    dataFound = await connection(table)
      .where(query)
  }

  return dataFound
}
module.exports = {
  list,
  get,
  insert,
  update,
  query
}
