const trackModel = require('../models/track');
const config = require('../config/config');
const request = require('request-promise');
const customError = require('../modules/customError');

module.exports = {
	getTracksByUser: async (req, res, next) => {
		try {
			res.status(200).json(await trackModel.find({userId: {$in: req.user._id}}))
		} catch (err) {
			next(new customError(err.message, err.code))
		}
	},
	postTrack: async (req, res, next) => {
		try {
			let track = {}
			if (req.body.id) {
				let options = {
					method: 'GET',
					uri: config.deezer.apiUrl + '/track/' + req.body.id,
					json: true
				};
				track = await request(options)
				if (track.id) {
					track.userId = req.user._id
					track = await trackModel.create(track)
				}
				else
					throw new Error('Track does not exist')
			}
			return res.status(201).json(track);
		} catch (err) {
			console.log("Bad Request postTrack" + err)
			next(new customError(err.message, err.code))
		}
	},
	deleteTrackById: async (req, res, next) => {
		try {
			await trackModel.deleteOne({_id: req.params.id, userId: req.user._id})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			next(new customError(err.message, err.code))
		}
	}
};