
exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('login', 20).notNullable();
      table.string('password', 255).notNullable();
      table.integer('age', 3).notNullable();
      table.boolean('is_deleted').defaultTo(false)
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('users')
};
