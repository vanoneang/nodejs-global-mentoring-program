
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { openid: '0e6bd69a', login: 'van', password: 'a123456', age: 21, is_deleted: true },
        { openid: '50ed476d', login: 'joy', password: 'a123456', age: 34, is_deleted: false },
        { openid: '358017f2', login: 'max', password: 'a123456', age: 24, is_deleted: false },
        { openid: '903da080', login: 'ken', password: 'a123456', age: 29, is_deleted: false },
        { openid: '9krd3w20', login: 'jan', password: 'a123456', age: 22, is_deleted: false }
      ]);
    });
};
