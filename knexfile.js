// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '',
      database: 'nodejs-mentoring'
    },
    seeds: {
      directory: './src/db/seeds'
    },
    migrations: {
      directory: './src/db/migrations'
    }
  }
};
