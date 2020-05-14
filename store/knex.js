
const { knex: { host, user, password, database, port, client } } = require('../config')

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
      client: client,
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
    .first()
}
async function insert (table, data, t = null) {
  try {
    const query = connection(table)
    if (t) query.transacting(t)
    const [id] = await query.insert(data, 'id')

    const savedData = connection(table)
    if (t) savedData.transacting(t)
    const [result] = await savedData.where({ id })

    return result
  } catch (error) {
    if (t) t.rollback()
    throw new Error(error)
  }
}
async function update (table, id, data) {
  const now = new Date()
  return connection(table)
    .where({ id })
    .update({ ...data, updated_at: now.toISOString() })
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

async function transaction () {
  return connection.transaction()
}

module.exports = {
  list,
  get,
  insert,
  update,
  query,
  transaction
}
