const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({
  limit: '200mb',
}));
app.use(express.urlencoded({
  extended: false,
  limit: '200mb',
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(require('cors')());

Object.defineProperty(global, 'APP_PATH', {
  value: path.resolve(__dirname),
});

const routes = require(`${APP_PATH}/routes`);
require(`${APP_PATH}/config/initData`)();

app.use('/tas-admin', require(`${APP_PATH}/routes/admin`));

app.use(/^(?!\/(static|api|fonts|images|styles)).*/, routes);
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', require('./api'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err; // req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
