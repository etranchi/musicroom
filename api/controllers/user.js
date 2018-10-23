const model = require('../models/user');


class User {

	static async getUsers() {
		try {
			let user = await model.find();
			return user;
		} catch (err) {
			console.log("Error: " + err);
			throw (err);
		}
	}

	static async postUser(user) {
		try {
			user.creationDate = Date();
			return await model.create(user);
		} catch (err) {
			console.log("creation Error: " + err);
			throw (err);
		}
	}
}

module.exports = User;