'use strict'

const modelSchema = require("./model")
const model = require('mongoose').model('modelUser', modelSchema);

class User {
	static async getUsers() {
		try {
			let user = await model.find({});
			return user;
		} catch (err) {
			console.log("throw getUsers" + err);
			throw (err);
		}
	}
}

module.exports = User;
