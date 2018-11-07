'use strict'

const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const strategies = require('../controllers/strategies')();
const passport = require('passport');
const middlewares = require('../modules/middlewares');

router.post('/login',
    	passport.authenticate('local', {session: false}), userController.connect
    );
// 192.....4242/user/login
// object user dans body mail,mdp


router.get('/login/facebook',
		passport.authenticate('facebook-token', { session: false } ), userController.connect
	);
// 192.....4242/user/login/facebook
// recuperer token depuis mail mdp
// authorization bearer token fb


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
// 192.....4242/user
// object user dans body login,mail,mdp


module.exports = router;
