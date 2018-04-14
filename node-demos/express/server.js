var express = require('express'),
    search = require('./search');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/search', function(req, res, next) {
  search(req.query.q, function(err, data) {
    if (err) {
      return next(err);
    }

    res.render("search", {results: data, search: req.query.q});
    // res.render('index');
  });
});

app.listen(3000);