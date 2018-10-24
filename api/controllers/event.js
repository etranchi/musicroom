const modelEvent = require('../models/event');

exports.getEvents = async (req, res) => {
	try {
		res.status(200).json(await modelEvent.find());
	} catch (err) {
		res.status(400).json(err);
	}
}

exports.getEventById = async (req, res) => {
	modelEvent.findById(req.params.id, (err, event) => {
		if (err) res.status(400).json(err);
		res.status(200).json(event);
	})
}

exports.postEvent = (req, res) => {
	modelEvent.create(req.body, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}

exports.putEventById = async (req, res) => {
	modelEvent.findByIdAndUpdate(req.params.id, req.body, {new: true},  (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}

exports.deleteEventById = async (req, res) => {
	modelEvent.findByIdAndRemove(req.params.id, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}
