// const mongoose = require('mongoose');
// // const Event = mongoose.model('Event');
// const Event = require('./model');
const event = require('../../models/event');

exports.getEvents = async (req, res) => {
	event.find(null, (err, event) => {
			if (err) res.status(400).json(err);
			res.status(200).json(event);
	});
}

exports.getEventById = async (req, res) => {
	event.findById(req.params.id, (err, event) => {
		if (err) res.status(400).json(err);
		res.status(200).json(event);
	})
}

exports.postEvent = (req, res) => {
	event.create(req.body, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}

exports.putEventById = async (req, res) => {
	event.findByIdAndUpdate(req.params.id, req.body, {new: true},  (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}

exports.deleteEventById = async (req, res) => {
	event.findByIdAndRemove(req.params.id, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}
