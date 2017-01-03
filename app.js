require('@risingstack/trace');

// your application's code
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// your application's code
var bodyParser = require('body-parser');
var mongoose =require("mongoose");
var dbUrl = 'mongodb://asjb:326382l@ds053718.mlab.com:53718/fcc-polls';

mongoose.connect(dbUrl, function(err, res){
  if (err){
    console.log("Db connection failed: " + err);
  } else {
    console.log("Db Connected"
    );
  }
  
});

var index = require('./routes/index');
var api = require('./routes/api');
var polldetail = require("./routes/polldetail");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
//app.use('/polldetail', polldetail);

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

module.exports = app;