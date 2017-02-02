require('@risingstack/trace');

// your application's code
var express = require('express');
var expressValidator = require('express-validator'); // new
var exphbs = require('express-handlebars'); // new
var flash = require("connect-flash");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require('passport');
var LocalStragegy = require('passport-local').Stragegy;  // new

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

dotenv.load();

var index = require('./routes/index');
var api = require('./routes/api');
var user = require('./routes/user');


var app = express();

app.use(favicon(path.join(__dirname, 'public/images/favicon.png')));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hjs');
// VIEW ENGINE CHANGED:::
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// -------------------- ADDED auth0 sample
// Session middleware
app.use(session({
  secret: 'shh54321',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//---------------- END of ADDED auth0 sample

// In this example, the formParam value is going to get morphed into form body format useful for printing. 
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

// Set global vars for flash messages...
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // passport sets its own messages
    next();
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/user', user);
//app.use('/loginA0', login);
app.use('/Polldetailfull/:id', index);
app.use('/editthepoll/:id', index);

console.log("moving to 404");

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