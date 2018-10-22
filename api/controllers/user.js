const user = require('../models/user');

exports.getUsers = (req, res) => {
	user.find(null, (err, event) => {
			if (err) res.status(400).json(err);
			res.status(200).json(event);
	});
}

exports.postUser = async (req, res) => {
	user.create(req.body, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}