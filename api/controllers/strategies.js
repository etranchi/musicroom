const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const DeezerStrategy = require('passport-deezer').Strategy;
const config = require('../config/config.json');

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
		console.log(profile);
		console.log("token -> " + accessToken);
		return done(null, profile);
	}));
}
