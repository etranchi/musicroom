const trackModel = require('../models/track');
const config = require('../config/config');
const request = require('request-promise');
const customError = require('../modules/customError');

module.exports = {
	getTracks: async (req, res, next) => {
		try {
			res.status(200).json(await trackModel.find())
		} catch (err) {
			next(new customError(err.message, err.code))
		}
	},
	getTrackById: async (req, res, next) => {
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
			next(new customError(err.message, err.code))
		}
	},
	// putTrackVote: async (req, res, next) => {
	// 	try {
	// 		let add = (req.body.vote > 0) ? 1 : -1
	// 		await trackModel.updateOne({id: req.params.id}, {$inc: {vote: add}})
	// 		res.status(200).json(data);
	// 	} catch (err) {
	// 		next(new customError(err.message, err.code));
	// 	}

	// },
	deleteTrackById: async (req, res, next) => {
		try {
			await trackModel.deleteOne({'id': req.params.id})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			next(new customError(err.message, err.code))
		}
	}
};