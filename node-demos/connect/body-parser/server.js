
/**
 * Module requirements.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static');

/**
 * Create server
 */

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(serveStatic('static'));

app.use(function (req, res) {
  if ('POST' == req.method && req.body.input) {
    res.end(req.body.input);
  }
});

/**
 * Listen.
 */

app.listen(3000);