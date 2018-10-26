'use strict'

const Crypto = require('../modules/crypto');

exports.callback = (req, res) => {
	res.status(200).json({'token': Crypto.createToken(req.user)});
}

exports.login_error = (req,res) => {
	res.status(403).json({'login': 'failed'});
}