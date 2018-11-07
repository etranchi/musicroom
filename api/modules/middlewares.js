'use strict';

const middlewares = {
	isConfirmed: function isConfirm(req, res, next) {
		if (req.user.status === 'Active') {
			next();
		} else {
			return res.send(401, {message: "Account not confirmed"});
		}
	}
};

module.exports = middlewares;
