
exports.up = (knex) => {
  return knex.schema.createTable('user_group', (table) =>  {
    table.increments('id').primary();
    table.string('user_id').references('openid').inTable('users');
    table.uuid('group_id').references('id').inTable('groups');
  });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('user_group')
};
