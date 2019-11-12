const db = require('../data/db-config');


const add = (user) => {
    return db('user').insert(user).then((users) => getUser({ id: users[0] }));
}

const getUser = (dataObj) => {
    return db('user').where(dataObj).first();
}

const getUsers = () => {
  return db('user');
}

module.exports = {
  add,
  getUser,
  getUsers,
}