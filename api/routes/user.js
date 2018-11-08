'use strict'

const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const strategies = require('../controllers/strategies')();
const passport = require('passport');
const middlewares = require('../modules/middlewares');
const multer  = require('multer')
const upload = multer({ dest: "./public/userPicture/"})
  
router.post('/login',
    	passport.authenticate('local', {session: false}), userController.connect
    );

router.get('/login/facebook',
		passport.authenticate('facebook-token', { session: false } ), userController.connect
	);

router.get('/login/google',
		passport.authenticate('google-token', { session: false } ), userController.connect
	);


router.get('/login/deezer',
		passport.authenticate('bearer'),
		middlewares.isConfirmed,
		userController.bindDeezerToken
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

router.post('/', upload.single('file'), userController.postUser);

module.exports = router;
