const trackModel = require('../models/track');
const config = require('../config/config');
const request = require('request-promise');

module.exports = {
	getTracks: async (req, res) => {
		try {
			res.status(200).json(await trackModel.find())
		} catch (err) {
			res.status(400).json(err)
		}
	},
	getTrackById: async (req, res) => {
		try {
			let track = await trackModel.findOne({'id': req.params.id})
			if (!track) {
				let options = {
					method: 'GET',
					uri: config.deezer.apiUrl + '/track/' + req.params.id,
					json: true
				};
				track = await request(options)
				if (track.id)
					await trackModel.create(track)
			}
			return res.status(200).json(track || {});
		} catch (err) {
			console.log("Bad Request getTrackById" + err)
			res.status(400).json(err);
		}
	},
	// putTrackVote: async (req, res) => {
	// 	try {
	// 		let add = (req.body.vote > 0) ? 1 : -1
	// 		await trackModel.updateOne({id: req.params.id}, {$inc: {vote: add}})
	// 		res.status(200).json(data);
	// 	} catch (err) {
	// 		res.status(400).json(err);
	// 	}

	// },
	deleteTrackById: async (req, res) => {
		try {
			await trackModel.deleteOne({'id': req.params.id})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			res.status(400).send(err);
		}
	}
};
