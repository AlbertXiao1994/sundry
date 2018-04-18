var express = require('express'),
    sio = require('socket.io'),
    request = require('superagent'),
    bodyParser = require('')

var app = express();

app.use(bodyParser.urlencode({extended: true}));

app.use(express.static("public"));

app.listen(3000);

var io = sio.listen(app),
    apiKey = 'cc78b550effeea0edb929ada1e9d0729',
    currentSong,
    dj;

function elect(socket) {
  dj = socket;
  io.sockets.emit('announcement', socket.nickname + ' is the new dj');
  socket.emit('elected');
  socket.dj = true;
  socket.on('disconnect', function() {
    dj = null;
    io.sockets.emit('announcement', 'the dj left - next one to join becomes dj');
  });
}

io.socket.on('connection', function(socket) {
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