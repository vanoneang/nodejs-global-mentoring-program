
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
       table.increments('id');
       table.string('login', 20).notNullable();
       table.string('password', 255).notNullable();
       table.integer('age', 3).notNullable();
       table.boolean('is_deleted').defaultTo(false)
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("users")
};
