



const express = require('express');
    const app = express();
    const http = require('http');
    const server = http.createServer(app);

    /*app.get('/', (req, res) => {
      res.send('<h1>Hello world</h1>');
    });*/

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
      });

    server.listen(2347, () => {
      console.log('listening on *:2347');
    });

    