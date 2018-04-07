var connect = require('connect'),
    serveStatic = require('serve-static');

var server = connect();

server.use(serveStatic(__dirname + '/website'));

server.listen(3000);