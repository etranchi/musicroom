const model = require('../models/user');
const Joi 	= require('joi');

exports.getUsers = async (req, res) => {

	try {
		console.info("getUser: getting all users ...");
		res.status(200).send(await model.find());
	} catch (err) {
		console.error("Error getUsers : %s", err);
		res.status(400).send(err);
	}
}

exports.postUser = async (req, res) => {
	const { error } = validateUser(req.body);

	if (error) {
		console.error('Error postUser : %s.', error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}
	try {
		console.info("PostUser: creating user %s ...",  req.body.login);
		res.status(201).send(await model.create(req.body));
	} catch (err) {
		console.error("Error postUser : %s" + err);
		res.status(400).send(err);
	}
}

exports.getUserById = async (req, res) => {
	const { error } = Joi.validate(req.params.id, Joi.string().length(24).alphanum().required());

	if (error) {
		console.error('Error getUserById : %s.', error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}

	try {
		console.info("getUserById: search _id -> %s", req.params.id);
		res.status(200).send(await model.find({"_id": req.params.id}));
	} catch (err) {
		console.error("Error getUserById: %s", err);
		res.status(400).send(err);
	}

}

exports.deleteUserById = async (req, res) => {
	const { error } = Joi.validate(req.params.id, Joi.string().length(24).alphanum().required());

	if (error) {
		console.error("Error deleteUserById : invalid _id : %s", _id)
		return res.status(400).send(error.details[0].message);
	}

	try {
		console.info("deleteUserById : delete _id -> %s", req.params.id);
		res.status(200).send(await model.deleteOne({"_id": req.params.id}));
	} catch (err) {
		console.error("Error deleteUserById: %s", err);
		res.status(400).send(err);
	}

}

function validateUser(user) {

	const schema = {
		login: Joi.string().min(3).max(9).required(),
		email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	};

	return Joi.validate(user, schema);
}