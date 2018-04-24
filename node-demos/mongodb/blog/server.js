
/**
 * 模块依赖
 */

var express = require('express'),
    mongoose = require('mongoose'),
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
    User.findById(req.session.loggedIn, function (err, doc) {
      if (err) return next(err);
      res.locals.me = doc;
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
  User.findOne({eamil:req.body.user.email, password}, function(err, doc) {
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
  var user = new User(req.body.user);
  user.save(function(err) {
    if (err)
      return next(err);
    res.redirect('/login/' + user.email);
  })
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

var url = "mongodb://127.0.0.1:27017/my-site";

mongoose.connect(url);
// 监听
app.listen(3000, function() {
  console.log('\033[96m + \033[39m app listening on *:3000');
});

/** 
 * 定义模型
*/

var Schema = mongoose.Schema;
var User = mongoose.model('user', new Schema({
  first: String,
  last: String,
  email: {type: String, unique: true},
  password: {type: String, index: true}
}));