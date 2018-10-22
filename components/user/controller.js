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