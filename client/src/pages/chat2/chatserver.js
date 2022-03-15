//const app = require('http').createServer(handler)
  //, io = require('socket.io').listen(app)
  //, fs = require('fs')
  /*
  const app = require('http');
  app.createServer(handler);
  const io = require('socket.io');
  io.listen(app);
  const fs = require('fs');
*/
//import { createServer } from "http";
var cors = require('cors');
const express = require('express');
const myExpress = express();
const http = require('http');
const app = http.createServer(myExpress);
const { Server } = require("socket.io");
//const io = new Server(app);


//import { Server } from "socket.io";

//const app = createServer();
const io = new Server(app, {
  cors: {
    origin: '*'
  }
});

//const app = http.createServer(app);
      /*const io = socketio(Server,{
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        }
      });


/*myExpress.get('/', (req, res) => {
  res.sendFile(__dirname + '/ChatWindow.jsx');
});*/

// respond with "hello world" when a GET request is made to the homepage
myExpress.get('/', (req, res) => {
  res.send('hello world')
})

//app.listen(3000);

app.listen(3000, () => {
  console.log('listening on *:3000');
});

var clients = {};

function handler (req, res) {
  myExpress.readFile(__dirname + '/index.jsx',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  console.log("a user connected");
  socket.on('add-user', function(data){
    console.log ("adding clients[" + data.id + "] the socket.id is: " + socket.id );
    clients[data.id] = {
      "socket": socket.id
    };
    console.log ("sockets:" + clients);
  });

  socket.on('message', function(data){
    //console.log("Sending: " + data.content + " to " + data.id);
    console.log("here we are: " + clients[data.recipientid] + " message is " + data.content);

    if (clients[data.recipientid] != undefined){//if other user is connected, send him a message
      const recipientsocket = io.of("/").sockets.get(clients[data.recipientid].socket);
      recipientsocket.emit("add-message", data);
      console.log("sent message to: " + data.recipientid);
      //io.sockets.connected[clients[data.id].socket].emit("add-message", data);
    } 
    else {
      //const socket = io.of("/").sockets.get(clients[data.id].socket);
      socket.emit("user-not-connected", data);
    }
    //Send message to self no matter what
    //const socket = io.of("/").sockets.get(clients[data.id].socket);
    socket.emit("add-message", data);
      //io.sockets.connected[clients[data.id].socket].emit("add-message", data);
      //io.sockets.connected[clients[data.id].socket].emit("user-not-connected", data);
    
      
    }
  );

  //Removing the socket on disconnect
  socket.on('disconnect', function() {
  	for(var id in clients) {
  		if(clients[id].socket === socket.id) {
  			delete clients[id];
  			break;
  		}
  	}	
  })

});


