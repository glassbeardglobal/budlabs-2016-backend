var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var socket_io = require('socket.io');

var app = express();

var io = socket_io();
app.io = io;

var routes = require('./routes/index');
var api = require('./routes/api')(io);

// Connect to MongoDB database
var connection = 'mongodb://gb_user:Orange97@ds033036.mlab.com:33036/budlab'

if (app.get('env') === 'development') {
  console.log("Connecting to local database...");
  connection = "mongodb://localhost:27017/budlab"
}
mongoose.connect(connection, function(err) {
  if (err) {
    console.log('Could not conneect to MongoDB database');
  } else {
    console.log('Connected to ' + connection);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/docs', express.static(path.join(__dirname, 'public/doc')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
