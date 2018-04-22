window.onload = function() {
  var socket = io.connect();
  socket.on('connect', function() {
    socket.emit('join', prompt('请输入您的名字：'));
  });

  // 显示聊天框
  document.getElementById('chat').style.display = 'block';

  socket.on('announcement', function(msg) {
    var li = document.createElement('li');
    li.className = 'announcement';
    li.innerHTML = msg;
    document.getElementById('messages').appendChild(li);
  });
};

function addMessage(from, text) {
  var li = document.createElement('li');
  li.className = 'messages';
  li.innerHTML = '<br>' + from + '</b>: ' + text;
}

var input = document.getElementById('input');
document.getElementById('form').onsubmit = function() {
  addMessage('me', input.value);
  socket.emit('text', iinput.value);

  // 重置输入框
  input.value = '';
  input.focus();

  return false;
}