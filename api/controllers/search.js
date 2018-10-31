const config = require('../config/config');
const request = require('request');


const moduleUrl = '/search';

module.exports = {
	search: (req, res) => {
		if (Object.keys(req.query).length === 0)
			res.status(400).json("error");
		console.log(req.query);
		console.log(config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q);
		request(
			{uri: config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q},
			(err, head, body) => {
				if (err)
					res.json(err)
				res.json(JSON.parse(body));
			})
	}
}
