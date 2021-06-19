// 给出错误的友好提示
var createError = require('http-errors');
var express = require('express');
// nodejs里的路径
var path = require('path');
var fs = require('fs')
// 解析cookie：可以通过req.cookie获取cookie
var cookieParser = require('cookie-parser');
// 用于自动生成日志：需要一些配置
var logger = require('morgan');
// 解析session
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// 处理一些前端的视图资源
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 使用日志记录
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境：log打印在控制台
  app.use(logger('dev'))
} else {
  // 线上环境：将文件写入access.log文件
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
// 原来 getPostData 的功能
app.use(express.json());
// 解析其他的数据格式：x-wwww-form-urlcoded
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());

// 处理一些静态文件
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',  //默认配置
    // httpOnly: true,  //默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// 注册路由：根路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
