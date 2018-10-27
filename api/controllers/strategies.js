const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const DeezerStrategy = require('passport-deezer').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-bearer-strategy').Strategy;
const config = require('../config/config.json');
const Crypto = require('../modules/crypto');
const modelUser = require('../models/user');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

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
            if (!user) {
                user = new modelUser({
                	facebookId: profile.id,
                    email: profile.emails[0].value,
                    login: !profile.username ? profile.displayName : profile.username,
					picture: profile.photos.length > 0 ? profile.photos[0].value : undefined,
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
                return done(null, user);
            }
        });
	}));

	passport.use(new LocalStrategy({
		usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
	},
	function (req, email, password, cb) {
		modelUser.findOne({
			'email': email
		}, function(err, user) {
			if (err || !user)
				return cb(null, false);
			argon.verify(user.password, password)
			.then(match => {
				if (match) {
					return cb(null, user);
				} else {
					return cb(null, false);
				}
			})
			.catch(err => {
				return cb(null, false);
			});
		})
	}));

	passport.use(new BearerStrategy({
		passReqToCallback: true
	}, function(req, token, done) {
			token = jwt.verify(token, config.token.secret);
			modelUser.findOne({
				'_id': token.id
			}, function (err, user) {
				if (err)
					return done(err);
				if (!user || user.status != 'Active') {
					return done(null, false);
				}
				return done(null, user, { scope: 'all' });
		});
	}));
}
