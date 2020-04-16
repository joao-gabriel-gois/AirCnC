const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const routes = require('./routes');

const app = express();
const server = http.Server();
const io = socketio(server);

mongoose.connect('mongodb+srv://stdnt-cl_pudou:Test@123@stdnt-cl-cfp6k.mongodb.net/omnistack?retryWrites=true&w=majority', {// this line will break, plz change to your credentials
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};// for study only, should use some db such as redis for it

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  console.log(`Usuário "${user_id} se conectou websocket " ${socket.id}`);
  connectUsers[user_id] = socket.id;
});

app.use((request, response, next) =>{
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());// by passing an argv with an obj which the prop is "origin", and the value the whitelisted domain . 
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);
