var connect = require('connect')
  , time = require('./request-time'),
  morgan = require('morgan');

var server = connect();

server.use(morgan('dev'));

server.use(time({time: 500}));

// 快速响应

server.use(function(req, res, next) {
  if ('/a' === req.url) {
    res.writeHead(200);
    res.end("Fast");
  } else {
    next();
  }
});

// 慢速响应

server.use(function(req, res, next) {
  if ('/b' === req.url) {
    setTimeout(function() {
      res.writeHead(200);
      res.end("Slow");
    }, 1000)
  } else {
    next();
  }
});

server.listen(3000);