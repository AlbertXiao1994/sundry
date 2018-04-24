
/**
 * 模块依赖
 */

var express = require('express'),
    mongodb = require('mongodb'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
    cookieParser = require('cookie-parser');

/**
 * 设置应用
 */

var app = express();

/** 
 * 中间件
*/
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(cookieSession({secret: 'my app secret'}));

/** 
 * 设置模板引擎
*/

app.set('view engine', 'jade');

/** 
 * 身份校验中间件
*/

app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    res.locals.authenticated = true;
    app.users.find({ _id: mongodb.ObjectID.createFromHexString(req.session.loggedIn)}).toArray(function (err, doc) {
      if (err) return next(err);
      res.locals.me = doc[0];
      next();
    });
  } else {
    res.locals.authenticated = false;
    next();
  }
});

/** 
 * 默认路由
*/

app.get('/', function(req, res) {
  res.render('index');
});

/** 
 * 登录路由
*/

app.get('/login/:signupEmail', function(req, res) {
  res.render('login', {signupEmail: req.params.signupEmail});
});

/** 
 * 登录处理路由
*/

app.post('/login', function(req, res) {
  app.users.find(req.body.user).toArray(function(err, doc) {
    if (err)
      return next(err);
    if (!doc) {
      return res.send('<p>User not found. Go back and try again');
    }
    req.session.loggedIn = doc[0]._id.toString();
    res.redirect('/');
  });
});

/** 
 * 注册路由
*/

app.get('/signup', function(req, res) {
  res.render('signup');
});

/** 
 * 注册处理路由
*/

app.post('/signup', function(req, res, next) {
  app.users.insertOne(req.body.user, function(err, doc) {
    if (err)
      return next(err);
    res.redirect('/login/' + doc.ops[0].email);
  }); 
});

/** 
 * 退出路由
*/

app.get('/logout', function(req, res) {
  req.session.loggedIn = null;
  res.redirect('/');
});

/** 
 * 连接数据库
*/

var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017";
var dbName = "my-site";

MongoClient.connect(url, function (err, client) {
  // 抛出异常
  if (err)
    throw err;
  
  console.log('\033[96m + \033[39m connected to mongodb');

  var dbo = client.db(dbName);

  // 设置集合快捷方式
  app.users = dbo.collection('users');

  // 监听
  app.listen(3000, function() {
    console.log('\033[96m + \033[39m app listening on *:3000');
  });
})