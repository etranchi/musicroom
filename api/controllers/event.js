'use strict'

const modelEvent = require('../models/event');
const ObjectId = require('mongodb').ObjectID;
const customError = require('../modules/customError');

module.exports = {
	getEvents: async (req, res, next) => {
		try {
			let myEvents = await modelEvent.find({'creator._id': req.user._id})
			let friendEvents = await modelEvent
				.find({$or: [
					{adminMembers:
						{$elemMatch:
							{_id: req.user._id}
						}
					},
					{members:
						{$elemMatch:
							{_id: req.user._id}
						}
					}
				]}
			)
			let allEvents = await modelEvent
				.find(
					{$and: [
						{adminMembers:
							{$not:
								{$elemMatch:
									{_id: req.user._id}
								}
							}
						},
						{members:
							{$not:
								{$elemMatch:
									{_id: req.user._id}
								}
							}
						},
						{'creator._id': {$ne: req.user._id}},
						{public: true}
					]}
			)
			res.status(200).json({myEvents, friendEvents, allEvents});
		} catch (err) {
			console.log("Error getEvents: " + err)
			next(new customError(err.message, 400))
		}
	},
	getEventById: async (req, res, next) => {
		try {
			let event = await modelEvent
				.findOne({$and: [{_id: req.params.id}, {$or: [
					{adminMembers:
						{$elemMatch:
							{_id: req.user._id}
						}
					},
					{members:
						{$elemMatch:
							{_id: req.user._id}
						}
					},
					{'creator._id': {$eq: req.user._id}},
					{public: true}
				]}]}
			)
			res.status(200).json(event || {})
		} catch (err) {
			next(new customError(err.message, 400))
		}
	},
	postEvent: async (req, res, next) => {
		try {
			req.body = JSON.parse(req.body.body);
			console.log("post event");
			console.log(req.body);
			if (!req.body.location)
				throw new Error('No Location')
			if (req.file && req.file.filename) req.body.picture = req.file.filename
			console.log("creating event");
			let event = await modelEvent.create(req.body)
			console.log("no time to populate");
			await event.populate('creator', 'User')
			await event.populate('members', 'Member')
			await event.populate('adminMembers', 'AdminMember')
			res.status(200).send(event)
		} catch (err) {
			console.log("ERROR POST EVENT -> " + err)
			next(new customError(err.message, 400))
		}
	},
	putEventById: async (req, res, next) => {
		try {
			if (!req.body.creator)
				throw new Error('No creator')
			if (!req.body.title)
				throw new Error('No title')
			if (!req.body.location)
				throw new Error('No location')
			if (!req.body.description)
				throw new Error('No description')
			let user = await modelEvent
				.findOne({$and: [{_id: req.params.id}, {$or: [
					{adminMembers:
						{$elemMatch:
							{_id: req.user._id}
						}
					},
					{'creator._id': {$eq: req.user._id}}
				]}]}
			)
			if (!user || user.length < 1)
				return next(new customError('You are not authorize to modify this event', 401))
			let test = await modelEvent.updateOne({_id: req.params.id}, req.body, {new: true})
			res.status(200).json(test)
		} catch (err) {
			next(new customError(err.message, 400))
		}
	},
	deleteEventById: async (req, res, next) => {
		try {
			await modelEvent.deleteOne({'_id': req.params.id})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			next(new customError(err.message, 400))
		}
	}
};
