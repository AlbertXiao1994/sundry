windos.onload = function() {
  var socket = io.connect();
  socket.on('connect', function() {
    socket.emit('join', prompt('请输入您的名字：'));
  });

  // 显示聊天框
  document.getElementById('chat').style.display = 'block';

  socket.on('announcement', function(msg) {
    var li = document.createElement('li');
    li.className = 'announcement';
    li.innnerHTML = msg;
    document.getElementById('messages').appendChild(li);
  });
};