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
      console.log(err)
    }
    var res = {};
    res.url = data.url;
    res.name = data.name;
    res.star = data.stargazers_count;
    res.render("search", {results: res, search: req.query.q,})
  });
});

app.listen(3000);