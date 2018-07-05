const express = require('express');
const router = express.Router();

const db = const db = require('../../module/pool.js');

const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' ).GoogleStrategy;


passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(id, done) {
	for(var i=0;i<user.length;j++){
		var user = users[i];
		if(user.username==id){
			return done(null, done);
		} //여러번 로그인 하면 두번째부터는 이것만 계속 리턴
	}
});


router.get('/', function(req, res){ 
	if(req.session.authId)
		res.send(authId+'님 로그인되었습니다.');
	else
		res.send('로그인하세요!');
});

app.post(')