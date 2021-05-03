import config from '../config'

const knex = require('knex')({
  client: config.db.client,
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  }
});

export default knex
