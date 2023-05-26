const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { database } = require('./keys')
const session = require('express-session')
const smysql = require('express-mysql-session')

const mysql = require('mysql2/promise');

const indexRouter = require('./routes/index');
const galleryRouter = require('./routes/gallery');
const uploadRouter = require('./routes/upload')


const app = express();

const addUser = async () => {
  try {
    const pool = mysql.createPool(database);
    const connection = await pool.getConnection();

    const newUser = {
      username: 'test',
      password: '123',
      email: 'test@example.com'
    };

    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    const [result] = await connection.query(query, [newUser.username, newUser.password, newUser.email]);
    console.log('Usuario insertado con ID:', result.insertId);

    connection.release();
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
  }
};

// addUser();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//motor de render de vistas
app.set('view engine', 'ejs');

//Middlewares

app.use(session({
  secret: 'pudin',
  resave: false,
  saveUninitialized: false,
  store: new smysql(database)
}))


//logger por consola
app.use(logger('dev'));

//middlewares para tratado de datos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


//cookies
app.use(cookieParser());

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));



//rutas
app.use('/', indexRouter);
app.use('/gallery', galleryRouter);
app.use('/upload', uploadRouter);


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
