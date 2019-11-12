const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('user').truncate()
    .then(function () {
      return knex('user').insert([
        {
          "username": "admin",
          "password": bcrypt.hashSync('admin', 11),
        },
        {
          "username": "chioma",
          "password": bcrypt.hashSync('chioma', 11),
        },
      ]);
    });
};
