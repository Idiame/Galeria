const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//motor de render de vistas
app.set('view engine', 'ejs');

//logger por consola
app.use(logger('dev'));

//middlewares para tratado de datos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cookies
app.use(cookieParser());

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
