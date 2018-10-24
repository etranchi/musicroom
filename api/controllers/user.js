const model = require('../models/user');

exports.getUsers = async (req, res) => {
	try {
		let user = await model.find();
		res.status(200).send(user);
	} catch (err) {
		console.log("Error: " + err);
		res.status(400).send(err);
	}
}

exports.postUser = async (req, res) => {
	try {
		let user = req.body;
		user.creationDate = Date();
		res.status(201).send(await model.create(user));
	} catch (err) {
		console.log("creation Error: " + err);
		res.status(400).send(err);
	}
}
