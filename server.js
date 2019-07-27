const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h1>Web API II Chanllenge...</h1>`);
});

module.exports = server;
