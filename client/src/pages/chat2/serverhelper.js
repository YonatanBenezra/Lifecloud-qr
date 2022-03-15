const express = require('express');
    const app = express();
    const http = require('http');
     


 function getApp() { 
    
    const server = http.createServer(app);   
    server.listen(2347, () => {
        console.log('listening on *:2347');
      });
    return server;
}