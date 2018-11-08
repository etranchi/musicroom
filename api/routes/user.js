'use strict'

const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const strategies = require('../controllers/strategies')();
const passport = require('passport');
const middlewares = require('../modules/middlewares');

/**
 * This function comment is parsed by doctrine
 * @route POST /user/login
 * @group user - Operations about user
 * @param {string} email.query.required - user's email
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - user info and jwt token
 * @returns {Error} 401 - Unauthorized
 * @returns {Error}  default - Unexpected error
 */
router.post('/login',
    	passport.authenticate('local', {session: false}), userController.connect
    );

router.get('/login/facebook',
		passport.authenticate('facebook-token', { session: false } ), userController.connect
	);


router.get('/login/deezer',
		passport.authenticate('bearer'),
		middlewares.isConfirmed,
		passport.authenticate('deezer', { session: false, scope: config.deezer.scope })
	);

router.get('/',
		passport.authenticate('bearer'),
		middlewares.isConfirmed,
		userController.getUsers
	);

router.put('/confirm',
		passport.authenticate('bearer'),
		userController.confirmUser
	);

router.post('/resendMail',
		userController.resendMail
	);

router.get('/me',
		passport.authenticate('bearer'),
		middlewares.isConfirmed,
		userController.getMe
	);

router.put('/me',
		passport.authenticate('bearer'),
		middlewares.isConfirmed,
		userController.modifyUserById
	);

router.delete('/me',
		passport.authenticate('bearer'),
		middlewares.isConfirmed,
		userController.deleteUserById
	);

router.get('/:id',
		passport.authenticate('bearer'),
		middlewares.isConfirmed,
		userController.getUserById
	);

router.post('/', userController.postUser);

module.exports = router;
