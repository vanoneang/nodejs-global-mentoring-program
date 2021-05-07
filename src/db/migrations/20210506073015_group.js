
exports.up = (knex) => {
  return knex.schema
    .createTable('groups', (table) => {
      table.uuid('id').primary();
      table.string('name', 20).notNullable();
      table.json('permissions');
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('groups')
};
