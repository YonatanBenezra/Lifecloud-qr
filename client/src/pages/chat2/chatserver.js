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

  socket.on('getAllConnectedUsers', function(data){
    const i = data.senderID;

    console.log("got into getAllConnectedUsers for user " + i);
    if (clients[myRecipientIDs[i]] != null){//if other user is connected, send him a message
      const recipientsocket = io.of("/").sockets.get(clients[myRecipientIDs[i]].socket);
      recipientsocket.emit("recieveAllConnectedUsers", clients);
      console.log("sent all connected users to: " + myRecipientIDs[i]);
      //io.sockets.connected[clients[data.id].socket].emit("add-message", data);
    } 
    
      
    
}
);

  socket.on('message', function(data){
    console.log("got into message");
          if(data.purpose && data.purpose == "get client array"){
                  const i = data.senderID;

                  console.log("got into getAllConnectedUsers for user " + i);
                  //if (clients[myRecipientIDs[i]] != null){//if other user is connected, send him a message
                    const recipientsocket = io.of("/").sockets.get(clients[i].socket);
                    console.log("recipient socket:" + recipientsocket)
                    //data.push({"purpose":"clientsarray","clientsarray":clients})
                    data.purpose = "clientsarray";
                    data.clientsarray = JSON.stringify(clients);
                    var myMessage = {"purpose":"clientsarray","clientsarray":JSON.stringify(clients)};
                    recipientsocket.emit("add-message", myMessage);
                    //recipientsocket.broadcast.to(i).emit('add-message', myMessage);
                    console.log("sent all connected users to: " + i);
                    //io.sockets.connected[clients[data.id].socket].emit("add-message", data);
            } 

          
          else {
                const myRecipientIDs = data.recipient_ids;
                //console.log("Sending: " + data.message + " to " + data.id);
                for (var i = 0; i < myRecipientIDs.length; i++){
                    /*if (clients[myRecipientIDs[i]] == undefined){
                        continue;
                    }*/
                          console.log("here we are: " + clients[myRecipientIDs[i]] + " message is " + data.message);

                          if (clients[myRecipientIDs[i]] != null){//if other user is connected, send him a message
                            const recipientsocket = io.of("/").sockets.get(clients[myRecipientIDs[i]].socket);
                            recipientsocket.emit("add-message", data);
                            console.log("sent message to: " + myRecipientIDs[i]);
                            //io.sockets.connected[clients[data.id].socket].emit("add-message", data);
                          } 
                          else {
                            //const socket = io.of("/").sockets.get(clients[data.id].socket);
                            socket.emit("user-not-connected", data);
                          }
                          //Send message to self no matter what
                          //const socket = io.of("/").sockets.get(clients[data.id].socket);
                          //socket.emit("add-message", data);
                            //io.sockets.connected[clients[data.id].socket].emit("add-message", data);
                            //io.sockets.connected[clients[data.id].socket].emit("user-not-connected", data);
                          
                            
                          }
                }
      }
  );



  

  //Removing the socket on disconnect
  socket.on('disconnect', function() {
  	for(var id in clients) {
  		if(clients[id].socket === socket.id) {
  			delete clients[id];
        console.log("user disconnected");
  			break;
  		}
  	}	
  })

});


