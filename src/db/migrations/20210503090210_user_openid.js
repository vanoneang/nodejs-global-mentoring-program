
exports.up = (knex) => {
  return knex.schema
    .table('users', (table) => {
      table.string('openid');
      table.unique('openid');
    })
};

exports.down = (knex) => {
  return knex.schema
    .table('users', (table) => {
      table.dropColumn('openid');
      table.dropUnique('openid');
    })
};
