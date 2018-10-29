'use strict'

const model = require('../models/user');
const Crypto = require('../modules/crypto');
const Utils = require('../modules/utils');
const jwt = require('jsonwebtoken');
const Joi 	= require('joi');
const config = require('../config/config.json');
const argon = require('argon2');

exports.connect = (req, res) => {
		res.status(200).json({'token': Crypto.createToken(req.user)});
    }

exports.getUsers = async (req, res) => {
	try {
		console.info("getUser: getting all users ...");
		let users = await model.find()
		users.map((user) => {
			return Utils.filter(model.schema.obj, user, 0)
		})
		res.status(200).send(users);
	} catch (err) {
		console.error("Error getUsers : %s", err);
		res.status(400).send(err);
	}
}

exports.postUser = async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			console.error('Error postUser : %s.', error.details[0].message);
			return res.status(400).send(error.details[0].message);
		}
		const exist = await model.findOne({email: req.body.email});
		if (exist) {
			console.error('Error postUser : %s is already used.', req.body.mail);
			return res.status(400).send("Email already used.");
		}
		console.info("PostUser: creating user %s ...",  req.body.login);
		let user = req.body
		user = Utils.filter(model.schema.obj, user, 1)
		user.email = Utils.normalize(user.email)
		user.password = await argon.hash(user.password);
		user = await model.create(user);
		res.status(201).send({'token': Crypto.createToken(user)})
	} catch (err) {
		console.error("Error postUser : %s" + err);
		res.status(400).send(err);
	}
}

exports.getUserById = async (req, res) => {
	try {
		const { error } = validateId(req.params);
		if (error) {
			console.error('Error getUserById : %s.', error.details[0].message);
			return res.status(400).send(error.details[0].message);
		}
		console.info("getUserById: search _id -> %s", req.params.id);
		res.status(200).send(await model.find({"_id": req.params.id}));
	} catch (err) {
		console.error("Error getUserById: %s", err);
		res.status(400).send(err);
	}

}

exports.deleteUserById = async (req, res) => {
	try {
		const { error } = validateId(req.params);
		if (error) {
			console.error('Error getUserById : %s.', error.details[0].message);
			return res.status(400).send(error.details[0].message);
		}
		console.info("deleteUserById : delete _id -> %s", req.params.id);
		res.status(200).send(await model.deleteOne({"_id": req.params.id}));
	} catch (err) {
		console.error("Error deleteUserById: %s", err);
		res.status(400).send(err);
	}

}

exports.modifyUserById = async (req, res) => {
	try {
		if (!req.body)
			return res.status(204);
		let { error } = validateUpdateUser(req.body);
		if (error) {
			console.error("Error modifyUserById : invalid user format.");
			return res.status(400).send(error.details[0].message);
		}
		let user = req.body
		user = Utils.filter(model.schema.obj, user, 1)
		if (user.password)
			user.password = await argon.hash(user.password);
		await model.updateOne({"_id": req.params.id}, user);
		console.info("modifyUserById : modify _id : %s", req.params.id);
		return res.status(200).send("User modified");
	} catch (err) {
		console.error("Error modifyUserById: %s", err);
		res.status(400).send(err);
	}
}

exports.confirmUser = async (req, res) => {
	try {
		if (req.user.status == 'Created')
		{
			await model.updateOne({_id: req.user._id}, {status: 'Active'});
			return res.status(200).send({'token': Crypto.createToken(await model.findOne({_id: req.user._id}))});
		}
		res.status(400).send({message: "bad token"});
	} catch (err) {
		console.error("Error modifyUserById: %s", err);
		res.status(400).send(err);
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
		password: Joi.string().min(8).max(30).required()
	};

	return Joi.validate(user, schema);
}
function validateUpdateUser(user) {

	const schema = {
		login: Joi.string().min(3).max(9),
		password: Joi.string().min(8).max(30)
	};

	return Joi.validate(user, schema);
}
