const user = require('../models/user');

exports.getUsers = (req, res) => {
	try {
		user.find(null, (err, user) => {
			if (err)
				res.status(400).json(err)
			res.status(200).json(user);
		});
	} catch (err) {
		console.log("ERROR");
		res.status(400).send(err)
	}
}

exports.postUser = async (req, res) => {
	try {
		console.log(req.body);
		let user = await manager.createUser(req.body);
		res.status(200).json("user created");
	} catch (err) {
		console.log("ERROR");
		res.status(400).send(err)
	}
}