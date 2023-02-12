var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var honorsRouter = require('./routes/honors')
var express = require('express')
var cors = require('cors')



var app = express();

//importar conexion a mongodb
require('./lib/ConectToMongoose');
app.use(cors());


//rutas a api
app.use('/api/listadeposts', require('./api/post_api'));
app.use('/api/seguidores',require('./api/followers_api.js'));







//Arranacar la aplicacaion por el puerto 3000
app.listen(3000,"127.0.0.1",()=>{
  console.log("Servidor arrancado");
})

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/honors', honorsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


// si es una petición al API, responder con formato JSON
if (req.originalUrl.startsWith('/api/')) {
  res.json({ error: err.message });
  return;
}

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
