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

	const exist = await model.find({$or: [{email: req.body.email}, {login: req.body.login}]}).count();
	if (exist != 0) {
		console.error('Error postUser : %s or %s is already used.', req.body.login, req.body.mail);
		return res.status(400).send("Login or Email already used.");
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
	const { error } = validateId(req.params);

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
	const { error } = validateId(req.params.id);

	if (error) {
		console.error("Error deleteUserById : invalid _id : %s", _id);
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

exports.modifyUserById = async (req, res) => {
	if (req.body)
	{
		var { error } = validateUser(req.body);
		if (error) {
			console.error("Error modifyUserById : invalid user format.");
			return res.status(400).send(error.details[0].message);
		}
		var { error }  = validateId(req.params);
		if (error) {
			console.error("Error modifyUserById : invalid _id : %s", req.params.id);
			return res.status(400).send(error.details[0].message);
		}

		const exist = await model.find({_id : req.params.id}).count();
		if (exist == 0) {
			console.error('Error modifyUserById : %s don\'t exist', req.body.login, req.body.email);
			return res.status(400).send("This _id don't exist.");
		}

		try {
			await model.update({"_id": req.params.id}, { $set: { login: req.body.login, email: req.body.email}});
			console.info("modifyUserById : modify _id : %s", req.params.id);
			return res.status(200).send("User modified");
		} catch (err) {
			console.error("Error modifyUserById: %s", err);
			res.status(400).send(err);
		}
	}
}


function validateId(id)
{
	const schema = {
		id: Joi.string().length(24).alphanum().required()
	};	

	return Joi.validate(id, schema);
}
function validateUser(user) {

	const schema = {
		login: Joi.string().min(3).max(9).required(),
		email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	};

	return Joi.validate(user, schema);
}