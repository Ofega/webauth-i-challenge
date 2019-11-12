const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const usersRouter = require('../users/router');
const server = express();

const middleware = [helmet(), cors(), express.json()];
server.use(middleware);

server.use(session({
    name: 'user_sid',
    secret: 'secretvalue',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
}));
  
server.use('/api', usersRouter);

server.get('/', (req, res) => {
    res.json('Welcome to test server 01')
})

module.exports = server;