var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // @ gestion des cookies
var bodyParser = require('body-parser'); // @ body-parser, formate le request d'un form
// ***** middleware en plus
var multer = require('multer') // req.body récupère les champs d'un form
// @ gestion des sessions
var session = require('express-session')
// @ gestion des requete http
var reqhttp = require('request')// module de requète http

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var upload = multer()

//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mykey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// pour une utilisation de session en production : utiliser redis : https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/

// ***** modules perso
// @ map module gestion de la map
var map = require('./nodules/map')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ***** moteur template *****
app.set('view engine', 'ejs')
//app.use(express.static('public')) // route static du dossier public


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); //parsing application json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application x/www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = (express, app);

app.listen(8081)
