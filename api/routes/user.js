'use strict'

const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const strategies = require('../controllers/strategies')();
const passport = require('passport');

router.get('/login/facebook',
		passport.authenticate('facebook', { session: false, scope: config.facebook.scope })
	);

router.get('/login/deezer',
		passport.authenticate('deezer', { session: false, scope: config.deezer.scope })
	);

router.get('/', userController.getUsers);

// router.get('/:id', userController.getUserById);

router.post('/', userController.postUser);

// router.post('/register', userController.registerUser);

// router.put('/:id', userController.putUserById);

// router.delete('/:id', userController.deleteUserById);

module.exports = router;
