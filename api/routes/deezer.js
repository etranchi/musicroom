'use strict';
const express = require('express')
const router = express.Router()
const passport = require('passport');
const DeezerStrategy = require('passport-deezer').Strategy;
const config = require('../config/config.json');
const util = require('util');
const controller = require('../controllers/deezer');

passport.use(new DeezerStrategy({
	clientID: config.deezer.clientID,
	clientSecret: config.deezer.clientSecret,
	callbackURL: config.deezer.callbackURL,
	scope: config.deezer.scope
},
function(accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));

router.get('/',
	   	passport.authenticate('deezer'), 
		controller.index);

router.get('/callback',
		passport.authenticate('deezer', { session: false, failureRedirect: '/login/error' }),
		controller.callback
);

router.get('/login/error', controller.login_error);

module.exports = router;

