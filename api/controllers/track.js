const trackModel = require('../models/track');
const eventModel = require('../models/event');
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
			if (!req.body.id)
				throw new Error('Music id is missing')
			let track = await trackModel.findOne({id: req.body.id})
			if (!track) {
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
			} else {
				if (track.userId.indexOf(req.user._id) === -1)
					track = await trackModel.findOneAndUpdate({id: req.body.id}, {$push: {userId: req.user._id}}, {new: true})
				else
					throw new Error('Already in your loved tracks')
			}
			return res.status(201).json(track);
		} catch (err) {
			console.log("Bad Request postTrack" + err)
			next(new customError(err.message, 400))
		}
	},
	putTrackLike: async (req, res, next) => {
		try {
			if (!req.body.trackId)
				throw new Error('No track id')
			let event = await eventModel.findOne({_id: req.params.id})
			if (event) {
				event.playlist.tracks.data.map((elem) => {
					if (elem._id == req.body.trackId) {
						let i = elem.likes.indexOf(req.user._id)
						if (i !== -1) {
							elem.likes.splice(i, 1)
						} else {
							elem.likes.push(req.user._id)
						}
					}
				});
				event.playlist.tracks.data.sort((a, b) => {
					return (b.likes.length - a.likes.length)
				})
				event = await eventModel.findOneAndUpdate({_id: req.params.id}, event, {new: true})
			}

			res.status(200).send(event);
		} catch (err) {
			console.log(err)
			next(new customError(err.message, err.code))
		}
	},
	putTrackStatus: async (req, res, next) => {
		console.log("API : Dans puttrackStatus : ")
		console.log("status : ", req.body.status)
		try {
			if (!req.body.trackId)
				throw new Error('No track id')
			let event = await eventModel.findOne({_id: req.params.id})
			if (event) {
				event.playlist.tracks.data.map((elem) => {
					if (elem._id == req.body.trackId) {
						elem.status = req.body.status
					}
				});
				event = await eventModel.findOneAndUpdate({_id: req.params.id}, event, {new: true})
			}
			res.status(200).send(event);
		} catch (err) {
			console.log(err)
			next(new customError(err.message, err.code))
		}
	},
	deleteTrackById: async (req, res, next) => {
		try {
			await trackModel.updateOne({id: req.params.id}, {$pull: {userId: req.user._id}})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			next(new customError(err.message, err.code))
		}
	}
};