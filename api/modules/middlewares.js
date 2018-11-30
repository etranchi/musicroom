'use strict';

const customError = require('../modules/customError');
const moment = require('moment');
const winston = require('winston');

const logger = winston.createLogger({
	levels: winston.config.syslog.levels,
	transports: [
		new winston.transports.File({
			filename: './logs/info.log',
			level: 'info'
		})
	]
});

const middlewares = {
	isConfirmed: function isConfirm(req, res, next) {
		if (req.user.status === 'Active') {
			next();
		} else {
			next(new customError('Account not confirmed', 401))
		}
	},
	logs: function logs(req, res, next) {
		req.meta = {
			date: moment().format('LLL'),
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
			user_agent: req.headers['user-agent'],
			route: req.originalUrl,
			method: req.method,
			body: req.body
		}
		logger.info(req.meta)
		next();
	  }
};

module.exports = middlewares;
