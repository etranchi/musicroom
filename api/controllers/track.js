const trackModel = require('../models/track');
const config = require('../config/config');
const request = require('request');

module.exports = {
	getTracks: (req, res) => {
		trackModel.find(null, (err, data) => {
				if (err) res.status(400).json(err);
				res.status(200).json(data);
		})
	},
	getTrackById: (req, res) => {
		trackModel.findOne({'id':req.params.id}, (err, data) => {
			if (err)
				res.json(err)
			else if (data == null) 
			{
				request(
				{uri: config.deezer.apiUrl + '/track/' + req.params.id},
				(err, head, body) => {
					if (err)
						res.json(err)
					trackModel.create(JSON.parse(body), (err, data) => {
						if(err) return res.status(400).json(err);
						res.status(200).json(data);
					});
				})
			} else
				res.status(200).json(data);
		});
	},
	postTrackVote: (req, res) => {
		trackModel.create(req.body, (err, data) => {
			if(err) return res.status(400).json(err);
			res.status(200).json(data);
		});
	},
	deleteTrackById: (req, res) => {
		trackModel.findOneAndDelete({'id':req.params.id}, (err, data) => {
			if(err) return res.status(400).json(err);
			res.status(200).json(data);
		});
	}
};
