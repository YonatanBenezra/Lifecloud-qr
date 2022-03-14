const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});



io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });

server.listen(2347, () => {
  console.log('listening on *:2347');
});


/*
var express = require('express');
var app = express();

var server = app.listen(2347, function(err) {
    if (err) console.log("Error in server setup")
    console.log('server is running on port', server.address().port);
   });

app.use(express.static(__dirname));

*/