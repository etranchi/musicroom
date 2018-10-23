'use strict';
const express = require('express')
const router = express.Router()
const passport = require('passport');
const controller = require('../controllers/facebook');

router.get('/callback',
		passport.authenticate('facebook', { session: false, failureRedirect: '/login/error' }),
		controller.callback
);

router.get('/login/error', controller.login_error);

module.exports = router;

