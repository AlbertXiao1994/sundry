window.onload = function() {
  var socket = io();
  socket.on('connect', function() {
    socket.emit('join', prompt('请输入您的名字：'));

    // 显示聊天框
    document.getElementById('chat').style.display = 'block';

    socket.on('announcement', function(msg) {
      var li = document.createElement('li');
      li.className = 'announcement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });
  });

  function addMessage(from, text) {
    var li = document.createElement('li');
    li.className = 'messages';
    li.innerHTML = '<br>' + from + '</b>: ' + text;
    document.getElementById('messages').appendChild(li);
  }
  
  var input = document.getElementById('input');
  document.getElementById('form').onsubmit = function () {
    addMessage('me', input.value);
    socket.emit('text', input.value);

    // reset the input
    input.value = '';
    input.focus();

    return false;
  }
  
  socket.on('text', function(from, text) {
    console.log('client text ok')
    addMessage(from, text);
  });

  var form = document.getElementById('dj');
  form.onsubmit = function () {
    return false;
  };

  socket.on('elected', function () {
    form.className = 'isDJ';
  });
}