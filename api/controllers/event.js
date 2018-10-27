const modelEvent = require('../models/event');
// geolib pour le calcul de radius
module.exports = {
	getEvents: async (req, res) => {
		try {
			res.status(200).json(await modelEvent.find());
		} catch (err) {
			res.status(400).json(err);
		}
	},
	getEventById: async (req, res) => {
		modelEvent.findOne({'id':req.params.id}, (err, event) => {
			if (err) res.status(400).json(err);
			res.status(200).json(event);
		})
	},
	postEvent: (req, res) => {
		modelEvent.create(req.body, (err, event) => {
			if(err) return res.status(400).json(err);
			res.status(200).json(event);
		});
	},
	putEventById:async (req, res) => {
		modelEvent.findByIdAndUpdate(req.params.id, req.body, {new: true},  (err, event) => {
			if(err) return res.status(400).json(err);
			res.status(200).json(event);
		});
	},
	deleteEventById:async (req, res) => {
		modelEvent.findOneAndDelete({'id':req.params.id}, (err, event) => {
			if(err) return res.status(400).json(err);
			res.status(200).json(event);
		});
	}
};
