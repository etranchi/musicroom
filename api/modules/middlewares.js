'use strict';

const customError = require('../modules/customError');
const moment = require('moment');
const winston = require('winston');
const useragent = require('useragent');
useragent(true);

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
		const agent = useragent.parse(req.headers['user-agent']);
		req.meta = {
			date: moment().format('LLL'),
			ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
			deviceVersion: agent.device.toVersion(),
			device: agent.device.toString(),
			platform: agent.os.toString(),
			platformVersion: agent.os.toVersion(),
			on: agent.toAgent(),
			version: agent.toVersion(),
			route: req.originalUrl,
			method: req.method,
			body: req.body
		}
		let message = "[" + req.meta.date + "][" + req.meta.on + req.meta.version + "][" + req.meta.platform + "][" + req.meta.platformVersion + "][" + req.meta.device + "][" + req.meta.deviceVersion + "][" + req.meta.ip + "] Request method " + req.meta.method + " on " + req.meta.route
		logger.info(message)
		next();
	}
};

module.exports = middlewares;
