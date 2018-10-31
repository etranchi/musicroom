'use strict';
const express = require('express')
const router = express.Router()
const passport = require('passport');
const controller = require('../controllers/deezer');
const middlewares = require('../modules/middlewares');

router.get('/callback',
	passport.authenticate('bearer'),
	middlewares.isConfirmed,
	passport.authenticate('deezer', { session: false, failureRedirect: '/login/error' }),
	controller.callback
);

router.get('/login/error', controller.login_error);

module.exports = router;

