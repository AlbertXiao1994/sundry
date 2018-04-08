var connect = require('connect'),
    users = require('./users'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
    cookieParser = require('cookie-parser');

var app = connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cookieSession({secret: 'my app secret'}));

app.use(function(req, res, next) {
  if ('/' == req.url && req.session.logged_in) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
        'Welcome back, <b>' + req.session.name + '</b>. '
      + '<a href="/logout">Logout</a>'
    );
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if ('/' == req.url && 'GET' == req.method) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end([
        '<form action="/login" method="POST">'
      ,   '<fieldset>'
      ,     '<legend>Please log in</legend>'
      ,     '<p>User: <input type="text" name="user"></p>'
      ,     '<p>Password: <input type="password" name="password"></p>'
      ,     '<button>Submit</button>'
      ,   '</fieldset>'
      , '</form>'
    ].join(''));
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if ('/login' == req.url && 'POST' == req.method) {
    res.writeHead(200);
    if (!users[req.body.user] || req.body.password != users[req.body.user].password) {
      res.end('Bad username/password');
    } else {
      req.session.logged_in = true;
      req.session.name = users[req.body.user].name;
      res.end('Authenticated!');
    }
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if ('/logout' == req.url) {
    req.session.logged_in = false;
    res.writeHead(200);
    res.end('Logged out!');
  } else {
    next();
  }
});

app.listen(3000);