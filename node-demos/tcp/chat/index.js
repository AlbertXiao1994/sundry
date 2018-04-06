var net = require('net');

var server = net.createServer(function(conn) {
  console.log('\033[90m   new connection!\033[39m');
});

server.listen(3000, function() {
  console.log('\033[96m    server is running in 3000 port\033[39m')
});