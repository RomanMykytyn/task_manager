var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
var mongoose = require('mongoose');
=======
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

>>>>>>> fcedf91b7ecbcf1099a54f0b99f6da772a133ba9
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var User = require('./models/user');

var passport = require('passport');
var expressSession = require('express-session');

var app = express();

<<<<<<< HEAD
mongoose.connect('mongodb://localhost/task_manager', function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});


app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
=======
mongoose.connect('mongodb://localhost:27017/task_manager');

app.set('views', './views');
app.set('view engine', 'pug');

>>>>>>> fcedf91b7ecbcf1099a54f0b99f6da772a133ba9
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {index: false}));

app.use(session({
  cookie: { maxAge: 86400000 },
  secret: 'codeworkrsecret',
  saveUninitialized: true,
  resave: false
}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err
      ? done(err)
      : done(null,user);
  });
});

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);

<<<<<<< HEAD
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
=======
>>>>>>> fcedf91b7ecbcf1099a54f0b99f6da772a133ba9


module.exports = app;
