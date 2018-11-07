'use strict'

const model = require('../models/user');
const Crypto = require('../modules/crypto');
const Utils = require('../modules/utils');
const jwt = require('jsonwebtoken');
const Joi 	= require('joi');
const config = require('../config/config.json');
const argon = require('argon2');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: config.mail.service,
    auth: {
           user: config.mail.email,
           pass: config.mail.password
       }
   });
let mailOptions = {
    from: config.mail.email, // sender address
    to: config.mail.email, // list of receivers
    subject: 'Music room token', // Subject line
    html: '<p>Your html here</p>'// plain text body
};


exports.connect = (req, res) => {
		res.status(200).json({
			'token': Crypto.createToken(req.user),
			'user': Utils.filter(model.schema.obj, req.user, 0)
		});
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
		res.status(400).send(err.toString());
	}
}

exports.postUser = async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		req.body = JSON.parse(req.body.body);
		if (req.file && req.file.filename) {
			req.body.picture = req.file.filename
		}
		if (error) {
			console.error('Error postUser : ', error.details[0].message);
			throw new Error('Bad request ' + error.details[0].message)
		}
		console.info("PostUser: creating user ", req.body.login);
		let user = req.body
		user = Utils.filter(model.schema.obj, user, 1)
		user.email = Utils.normalize(user.email)
		user.password = await argon.hash(user.password);
		user = await model.create(user);
		// MAIL -> FrontUrl/token and send response "User created"
		// mailOptions.html = "click on <a href='FRONT ROUTE/confirm?token=" + Crypto.createToken(user) + "'>this link</a> to confirm your account"
		// transporter.sendMail(mailOptions, function (err, info) {
		// 	if(err)
		// 	  console.log(err)
		// 	else
		// 	  console.log(info);
		//  });
		res.status(201).send({'token': Crypto.createToken(user)})
	} catch (err) {
		console.error("Error postUser : " + err.toString());
		if (err.code == 11000)
			return res.status(400).send({message: "User already exist"});
		res.status(400).send({message: err.toString()});
	}
}

exports.getMe = async (req, res) => {
	try {
		res.status(200).send(Utils.filter(model.schema.obj, await model.findOne({"_id": req.user._id}), 0));
	} catch (err) {
		console.error("Error getUserById: %s", err);
		res.status(400).send({message: err.toString()});
	}

}

exports.getUserById = async (req, res) => {
	try {
		const { error } = validateId(req.params);
		if (error) {
			console.error('Error getUserById : %s.', error.details[0].message);
			throw new Error('Invalid id');
		}
		console.info("getUserById: search _id -> %s", req.params.id);
		let user = await model.findOne({"_id": req.params.id})
		res.status(200).send(Utils.filter(model.schema.obj, user, 0));
	} catch (err) {
		console.error("Error getUserById: %s", err);
		res.status(400).send({message: err.toString()});
	}

}

exports.deleteUserById = async (req, res) => {
	try {
		console.info("deleteUserById : delete _id -> %s", req.user._id);
		await model.deleteOne({"_id": req.user._id})
		res.status(204).send();
	} catch (err) {
		console.error("Error deleteUserById: %s", err);
		res.status(400).send({message: err.toString()});
	}

}

exports.modifyUserById = async (req, res) => {
	try {
		if (!req.body)
			return res.status(204);
		let { error } = validateUpdateUser(req.body);
		if (error) {
			console.error("Error modifyUserById : invalid user format.");
			throw new Error('Bad request' + error.details[0].message);
		}
		let user = req.body
		user = Utils.filter(model.schema.obj, user, 1)
		if (user.password)
			user.password = await argon.hash(user.password);
		await model.updateOne({"_id": req.user._id}, user);
		return res.status(200).send("User modified");
	} catch (err) {
		console.error("Error modifyUserById: %s", err);
		res.status(400).send({message: err.toString()});
	}
}

exports.confirmUser = async (req, res) => {
	try {
		if (req.user.status == 'Created')
		{
			await model.updateOne({_id: req.user._id}, {status: 'Active'});
			return res.status(200).send({'token': Crypto.createToken(await model.findOne({_id: req.user._id}))});
		}
		res.status(400).send({message: "Bad token"});
	} catch (err) {
		console.error("Error confirm user: %s", err);
		res.status(400).send({message: err.toString()});
	}		
}

exports.resendMail = async (req, res) => {
	try {
		let user = await model.findOne({email: req.body.email, status: 'Created'})
		if (user) {
			let token =  Crypto.createToken(user);
			// RESEND MAIL FrontUrl/token

			// TO DEL WHEN MAIL OK
			return res.status(200).send({token});
		}
		res.status(202).send({message: "Mail send (if account exist and not already validate)"})
	} catch (err) {
		console.error("Error resend mail: %s", err);
		res.status(400).send({message: err.toString()});
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
