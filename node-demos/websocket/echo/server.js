var express = require('express'),
    wsio = require('websocket.io');

var app = express();

var ws = wsio.attch(app);

app.use(express.static('public'));

ws.on('connection', function(socket) {
  socket.on('message', function(msg) {
    console.log('\033[96mgot:\033[36m ' + msg);
    socket.send(msg);
  });
});

app.listen(3000);