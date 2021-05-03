
exports.up = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.string('openid');
      table.unique('openid');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('users', function (table) {
      table.dropColumn('openid');
      table.dropUnique('openid');
    })
};
