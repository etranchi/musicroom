'use strict';

const customError = require('../modules/customError');

const middlewares = {
	isConfirmed: function isConfirm(req, res, next) {
		if (req.user.status === 'Active') {
			next();
		} else {
			next(new customError('Account not confirmed', 401))
		}
	}
};

module.exports = middlewares;
