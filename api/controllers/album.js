const config = require('../config/config');
const request = require('request');
const customError = require('../modules/customError');

const moduleUrl = '/album';

module.exports = {
	getTracksByAlbum: (req, res, next) => {
		request(
			{uri: config.deezer.apiUrl + moduleUrl + '/' + req.params.id},
			(err, head, body) => {
				if (err)
					next(new customError(err.message, err.code))
				res.json(JSON.parse(body));
			})
	},
}