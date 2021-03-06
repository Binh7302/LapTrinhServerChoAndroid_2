var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// const cors = require('cors');
const session = require('express-session');
//mongodb
const mongoose = require('mongoose');
require('./components/users/model');
require('./components/categories/model');
require('./components/products/model');


//router
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'bum',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// app.use(cors());
// app.all('/', function (request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

mongoose.connect('mongodb+srv://admin:123@cluster0.s7pfs.mongodb.net/mob402_asm?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


//routes
app.use('/', indexRouter);
app.use('/san-pham', productRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
