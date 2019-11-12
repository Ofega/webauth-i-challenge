const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const middleware = [helmet(), cors(), express.json()];
server.use(middleware);

server.get('/', (req, res) => {
    res.json('Welcome to test server 01')
})

module.exports = server;