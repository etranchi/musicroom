'use strict';

const sodium = require('sodium').api;
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

class Crypto {
	static randomString(size = 16, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
		let rand = '';
		sodium.randombytes_stir();
		for (let i = 0; i < size; i++) {
			rand += charset[sodium.randombytes_uniform(charset.length - 1)];
		}
		return rand;
	}

	static createToken(user) {
		const token = jwt.sign({
			id: user._id,
			salt: user.salt
			// expirationToken: expirationToken
		}, config.token.secret);
		// {
		// 	// expiresIn: expiresIn
		// });
		return token;
	}
}
module.exports = Crypto;
