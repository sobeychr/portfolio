const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');

const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
} = process?.env || {};

const publicOptions = {
  extensions: ['css', 'js'],
  index: false,
  maxAge: '5d',
  redirect: false,
};
app.use(express.static('public', publicOptions));
app.get('/', (_req, res) => {
  const id = uuidv4();
  res.status(200).send(`home - ${id}`).end();
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`started ${SERVER_HOST}:${SERVER_PORT}`);
});
