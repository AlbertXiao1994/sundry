var http = require('http');
var qs = require('querystring');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if ('/' === req.url) {
    res.end([
      '<form method="POST" action="/url">',
        '<h1>My form</h1>',
        '<fieldset>',
          '<legend>information</legend>',
          '<p>What is your name?</p>',
          '<input type="text" name="name">',
          '<p><button>Submit</button></p>',
        '</fieldset>',
      '</form>'
    ].join(''));
  } else if ('/url' === req.url && req.method === "POST") {
    var body = '';

    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<p>Content-Type:' + req.headers['content-type'] + '</p>'
        + '<p>Data:</p><pre>' + qs.parse(body).name + '</pre>');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);