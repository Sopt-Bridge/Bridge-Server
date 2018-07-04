const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;

module.exports = () => {
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
};

	passport.use(new FacebookStrategy({
		clientID: '페북 클리 아이디',
		clientSecret: '페북 클라 시크릿',
		callbackURL: 'alwaysawake.ml/auth/facebook',
		profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'displayName']
		passReqToCallback: true
	}, (req, accessToken, refreshToken, profile, done) => {
		User.findOne({id: profile.id}, (err, user) => {
			var fb_profile = profile._json;

			loginByThirdparty({
				'auth_type': 'facebook',
				'auth_id': fb_profile.id,
				'auth_name':fb_profile.name,
				'auth_email':fb_profile.email
			}, done);
			if (user) {
				return done (err, user);
			}// 회원정보 있으면 로그인
	/*		const newUser = new User({//없으면 생성
				id: profile.id
			});
			newUser.save((user) => {
				return done(null, user);
			});	*/
		});
	});

router.get('/', passport.authenticate('facebook'));

router.post('/' passport.authenticate('FbStrategy',{

	successRedirect:'/home',
	failureRedirect:'login',
	failureFlash: false
}
)
);
