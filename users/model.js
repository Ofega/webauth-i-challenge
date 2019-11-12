const db = require('../data/db-config');

const add = (user) => {
  return db('user').insert(user).then((users) => getUser({ id: users[0] }));
}

const getUser = (user) => {
  return db('user').where(user).first();
}

const getUsers = () => {
  return db('user');
}

module.exports = {
  add,
  getUser,
  getUsers,
}