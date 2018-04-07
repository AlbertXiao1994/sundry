
/**
 * Module requirements.
 */

var connect = require('connect')
  , fs = require('fs'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    http = require('http');

/**
 * Create server
 */

var app = connect();

app.use(bodyParser.urlencoded({extended: false}));

app.use(serveStatic('static'));

app.use(function (req, res) {
  if ('POST' == req.method && req.body.file) {
    fs.readFile(req.body.file.path, 'utf8', function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end('Error!');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end([
          '<h3>File: ' + req.body.file.name + '</h3>'
        , '<h4>Type: ' + req.body.file.type + '</h4>'
        , '<h4>Contents:</h4><pre>' + data + '</pre>'
      ].join(''));
    });
  }
});

/**
 * Listen.
 */

http.createServer(app).listen(3000);