var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' ).GoogleStrategy;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: '14brdg29hs2s7my2g6'
	resave: false,
	saveUninitialized: true;
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

passport.use(new GoogleStrategy({
	clientID: 'GOOGLE_CLIENT_ID',
	clientSecret: 'GOOGLE_CLIENT_SECRET',
	callbackURL: 'http://alwaysawake.ml/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(function() {
		user = profile;
		return done(null, user);
		});
	}
));

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
