const express = require('express');
const server = express();
const expressRouter = require('./data/Posts/express-router');

server.use(express.json());
server.use('/api/posts', expressRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Web API II Challenge...</h1>`);
});

module.exports = server;
