
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

app = express();

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
 * 默认路由
*/

app.get('/', function(req, res) {
  res.render('index', {authticated: false});
});

/** 
 * 登录路由
*/

app.get('/login', function(req, res) {
  res.render('login');
});

/** 
 * 注册路由
*/

app.get('/singup', function(req, res) {
  res.render('signup');
});

/** 
 * 监听
*/

app.listen(3000, function() {
  console.log('\033[96m + \033[39m app listening on *:3000');
});