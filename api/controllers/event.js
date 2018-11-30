'use strict'

const modelEvent = require('../models/event');
const ObjectId = require('mongodb').ObjectID;
// geolib pour le calcul de radius
module.exports = {
	getEvents: async (req, res) => {
		try {
			let myEvents = [] // await modelEvent.find({'creator._id': req.user._id})
			let friendEvents = [] // await modelEvent.find({'adminMembers._id': req.user._id})
			let allEvents = await modelEvent.find();
			console.log("ici");
			res.status(200).json({myEvents, friendEvents, allEvents});
		} catch (err) {
			console.log("Error getEvents: " + err)
			res.status(400).json(err);
		}
	},
	getEventById: async (req, res) => {
		try {
			res.status(200).json(await modelEvent.findOne({'_id':req.params.id}));
		} catch (err) {
			res.status(400).json(err);
		}
	},
	postEvent: async (req, res) => {
		try {
			req.body = JSON.parse(req.body.body);
			if (req.file && req.file.filename) req.body.picture = req.file.filename
			let event = await modelEvent.create(req.body)
			await event.populate('creator', 'User')
			await event.populate('members', 'Member')
			await event.populate('adminMembers', 'AdminMember')
			res.status(200).send(event)
		} catch (err) {
			console.log("ERROR POST EVENT -> " + err)
			res.status(400).json(err);
		}
	},
	putEventById: async (req, res) => {
		console.log("Je suis ici", req.params)
		try {
			// ADD JOI.VALIDATION
			let test = await modelEvent.updateOne({_id: req.params.id}, req.body, {new: true})
			res.status(200).json(test)
		} catch (err) {
			res.status(400).json(err);
		}
	},
	deleteEventById: async (req, res) => {
		try {
			await modelEvent.deleteOne({'_id': req.params.id})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			res.status(400).send(err);
		}
	}
};
