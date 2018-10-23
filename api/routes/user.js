'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const passport = require('passport');

// MOVE TO STRATEGY
const FacebookStrategy = require('passport-facebook').Strategy;
const DeezerStrategy = require('passport-deezer').Strategy;
const config = require('../config/config.json');

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
// END MOVE

router.get('/login/facebook',
	passport.authenticate('facebook', { session: false, scope: config.facebook.scope }),
	(req, res) => {
		res.status(200).send('logged in');
});

router.get('/login/deezer',
	passport.authenticate('deezer', { session: false, scope: config.deezer.scope }),
	(req, res) => {
		res.status(200).send('logged in');
});

router.get('/', async (req, res) => {
	try {
		res.status(200).send(await userController.getUsers());
	} catch (err) {
		res.status(400).send(err);
	}
});

// router.get('/:id', userController.getUserById);

router.post('/', async (req, res) => {
	try {
		res.status(201).send(await userController.postUser(req.body));
	} catch (err) {
		res.status(400).send(err);
	}
});

// router.post('/register', userController.registerUser);

// router.put('/:id', userController.putUserById);

// router.delete('/:id', userController.deleteUserById);

module.exports = router;
