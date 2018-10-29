'use strict';

const middlewares = {
isConfirmed: function isConfirm(request, response, next) {
		if (request.user.status === 'Active') {
			next();
		} else {
			return response.send(401, {message: "Account not confirmed"});
		}
	}
};

module.exports = middlewares;