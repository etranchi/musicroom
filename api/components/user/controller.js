const modelManager = require('./modelManager');

exports.getUsers = async (req, res) => {
	try {
		let user = await modelManager.getUsers();
		res.status(200).json(user);
	} catch (err) {
		console.log("ERROR");
		res.status(400).send(err)
	}
}

exports.postUser = async (req, res) => {
	try {
		console.log(req.body);
		let user = await modelManager.createUser(req.body);
		res.status(200).json("user created");
	} catch (err) {
		console.log("ERROR");
		res.status(400).send(err)
	}
}