'use strict'

const config = require('../config/config.json');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const strategies = require('../controllers/strategies')();
const passport = require('passport');

// router.post('/login', function (req, res, next) {

//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         console.log(err);
//         if (err || !user) {
//             return res.status(400).json({
//                 message: info ? info.message : 'Login failed',
//                 user   : user
//             });
//         }

//         req.login(user, {session: false}, (err) => {
//             if (err) {
//                 res.send(err);
//             }

//             const token = JWT.sign({
// 				id: user.id,
// 				salt: user.salt,
// 				expirationToken: expirationToken
// 			}, {
// 				jwtid: Crypto.randomString(16),
// 				expiresIn: expiresIn
// 			});

//             return res.json({user, token});
//         });
//     })
//     (req, res);

// });

router.post('/login',
    	passport.authenticate('local', {session: false}), userController.connect
    );

router.get('/login/facebook',
		passport.authenticate('facebook', { session: false, scope: config.facebook.scope })
	);

router.get('/login/deezer',
		passport.authenticate('deezer', { session: false, scope: config.deezer.scope })
	);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.postUser);

router.delete('/:id', userController.deleteUserById);

router.post('/:id', userController.modifyUserById);

module.exports = router;
