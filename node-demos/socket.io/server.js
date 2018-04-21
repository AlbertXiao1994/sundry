var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app)
    io = require('socket.io')(server),
    request = require('superagent');

app.use(express.static("public"));

server.listen(3000, function() {
  console.log("Server listening at port 3000");
});

var apiKey = 'cc78b550effeea0edb929ada1e9d0729'
  , currentSong
  , dj;

function elect (socket) {
  dj = socket;
  io.sockets.emit('announcement', socket.nickname + ' is the new dj');
  socket.emit('elected');
  socket.dj = true;
  socket.on('disconnect', function () {
    dj = null;
    io.sockets.emit('announcement', 'the dj left - next one to join becomes dj');
  });
}

io.on('connection', function(socket) {
  socket.on('join', function(name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.');
    if (!dj) {
      elect(socket);
    } else {
      socket.emit('song', currentSong);
    }
  });

  socket.on('song', function(currentSong) {

  });

  socket.on('search', function(q, fn) {

  });

  socket.on('text', function(msg) {

  });
});