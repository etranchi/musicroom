const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const DeezerStrategy = require('passport-deezer').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/config.json');
const Crypto = require('../modules/crypto');
const modelUser = require('../models/user');

module.exports = function () {
	passport.use(new DeezerStrategy({
		clientID: config.deezer.clientID,
		clientSecret: config.deezer.clientSecret,
		callbackURL: config.deezer.callbackURL,
	},
	function(accessToken, refreshToken, profile, done) {
		console.log(profile);
		console.log("token -> " + accessToken);
		return done(null, profile);
	}));

	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		profileFields: config.facebook.profileFields,
		callbackURL: config.facebook.callbackURL
	},
	function(accessToken, refreshToken, profile, done) {
		modelUser.findOne({
            'facebookId': profile.id 
        }, function(err, user) {
            if (err) {
            	console.log(err);
                return done(null, false);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                user = new modelUser({
                	facebookId: profile.id,
                    email: profile.emails[0].value,
                    login: !profile.username ? profile.displayName : profile.username,
					picture: profile.photos.length > 0 ? profile.photos[0].value : undefined,
					salt: Crypto.randomString(16),
					status: 'Active'
                });
                modelUser.create(user, function(err) {
                    if (err) {
                    	console.log(err);
                    	return done(null, false);
                    }
                    return done(null, user);
                });
            } else {
                //found user. Return
                return done(null, user);
            }
        });
	}));

	passport.use(new LocalStrategy({
		usernameField: 'email',
        passwordField: 'password'
	},
	function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return UserModel.findOne({email, password})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));

}
