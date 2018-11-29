'use strict';

const middlewares = {
	isConfirmed: function isConfirm(req, res, next) {
		if (req.user.status === 'Active') {
			next();
		} else {
			let err = new Error('Account not confirmed')
			err.status = 401
			next(err)
		}
	}
};

module.exports = middlewares;
