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
		let message
		req.meta = {
			date: moment().format('LLL'),
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
			user_agent: req.headers['user-agent'],
			route: req.originalUrl,
			method: req.method,
			body: req.body
		}
		if (req.meta.user_agent === "MusicRoom")
			message = "[" + req.meta.date + "][from Swift App " + req.meta.user_agent + " ip " + req.meta.ip + "] Request method " + req.meta.method + " on " + req.meta.route + " body -> " + req.meta.body
		else
			message = "[" + req.meta.date + "][from " + req.meta.user_agent + " " + req.meta.ip + "] Request method " + req.meta.method + " on " + req.meta.route + " body -> " + JSON.stringify(req.meta.body)
		logger.info(message)
		next();
	  }
};

module.exports = middlewares;
