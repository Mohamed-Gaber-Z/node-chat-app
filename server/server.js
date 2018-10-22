const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));
socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user join'));

  socket.on('createMessage', (message, callback) => {
    console.log('new email', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
    });

    socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
