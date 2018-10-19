'use strict';
const express = require('express')
const router = express.Router()
const passport = require('passport');
const DeezerStrategy = require('passport-deezer').Strategy;
const config = require('../../config/config.json');

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
router.use(passport.initialize());

router.get('/deezer', passport.authenticate('deezer'), ( req, res) =>  {
	res.json(200, {'deezer_res':'toto'});
});

router.get('/deezer/callback',
		passport.authenticate('deezer', { session: false, failureRedirect: '/login/error' }),
		 function(req, res) {
				    res.json({'login':'success'});
		}
);

router.get('/login/error', ( req, res) =>  {
	res.json(403, {'login':'failed'});
});

module.exports = router;
