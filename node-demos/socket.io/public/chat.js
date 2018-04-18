windos.onload = function() {
  var socket = io.connect();
  socket.on('connect', function() {
    socket.emit('join', prompt('请输入您的名字：'));
  });
}