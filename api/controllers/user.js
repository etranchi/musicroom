'use strict'

const model = require('../models/user');
const Crypto = require('../modules/crypto');
const Utils = require('../modules/utils');
const customError = require('../modules/customError');
const Joi 	= require('joi');
const config = require('../config/config.json');
const argon = require('argon2');

// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//     service: config.mail.service,
//     auth: {
//            user: config.mail.email,
//            pass: config.mail.password
//        }
//    });
// let mailOptions = {
//     from: config.mail.email, // sender address
//     to: config.mail.email, // list of receivers
//     subject: 'Music room token', // Subject line
//     html: '<p>Your html here</p>'// plain text body
// };

exports.connect = (req, res) => {
		return res.status(200).json({
			'token': Crypto.createToken(req.user),
			'user': Utils.filter(model.schema.obj, req.user, 0)
		});
    }

exports.bindDeezerToken = async (req, res, next) => {
	try {
		let user = await model.findOneAndUpdate(
			{_id: req.user._id}, 
			{deezerToken: req.query.deezerToken}, 
			{new: true}
		)
		res.status(200).send(user);
	} catch (err) {
		console.log("bindDeezerToken " + err)
		next(new customError(err.message, 400))
	}
}

exports.deleteDeezerToken = async (req, res, next) => {
	try {
		let user = await model.findOneAndUpdate(
			{_id: req.user._id}, 
			{deezerToken: null}, 
			{new: true}
		)
		res.status(200).send(user);
	} catch (err) {
		console.log("bindDeezerToken " + err)
		next(new customError(err.message, 400))
	}
}

exports.getUsers = async (req, res, next) => {
	try {
		console.info("getUser: getting all users ...");
		let users = await model.find({_id: {$ne: req.user._id}})
		users.map((user) => {
			return Utils.filter(model.schema.obj, user, 0)
		})
		res.status(200).send(users);
	} catch (err) {
		console.error("Error getUsers : %s", err);
		next(new customError(err.message, 400))
	}
}

exports.postUser = async (req, res, next) => {
	try {
		if (req.body.body)
			req.body = JSON.parse(req.body.body)
		console.log("BODY : ", req.body)
		const { error } = validateUser(req.body);
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
			next(new customError("Email already used", 400))
		next(new customError(err.message, 400))
	}
}

exports.getMe = async (req, res, next) => {
	try {
		res.status(200).send(Utils.filter(model.schema.obj, await model.findOne({"_id": req.user._id}), 0));
	} catch (err) {
		console.error("Error getUserById: %s", err);
		next(new customError(err.message, 400))
	}

}

exports.getUserById = async (req, res, next) => {
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
		next(new customError(err.message, 400))
	}

}

exports.deleteUserById = async (req, res, next) => {
	try {
		console.info("deleteUserById : delete _id -> %s", req.user._id);
		await model.deleteOne({"_id": req.user._id})
		res.status(204).send();
	} catch (err) {
		console.error("Error deleteUserById: %s", err);
		next(new customError(err.message, 400))
	}

}

exports.modifyUserById = async (req, res, next) => {
	try {
		if (req.body.body)
			req.body = JSON.parse(req.body.body);
		console.log(req.body)
		if (!req.body)
			return res.status(204);
		if (req.file && req.file.filename)
			req.body.picture = req.file.filename
		let userUpdate = {}
		let user = req.body
		user = Utils.filter(model.schema.obj, user, 1)
		userUpdate.login = user.login
		userUpdate.picture = user.picture
		if (user.password) {
			if (user.password.length < 8 || user.password.length > 30)
				throw new Error('Password does not fit (length between 8 and 30)')
			user.password = await argon.hash(user.password);
			userUpdate.password = user.password
		} else {
			delete userUpdate.password
		}
		const {error} = Joi.validate(userUpdate, {login: Joi.string().min(3).max(9), password: Joi.string(), picture: Joi.string()})
		if (error) {
			throw new Error(error.details[0].message)
		}
		user = await model.findOneAndUpdate({"_id": req.user._id}, userUpdate, {new: true});
		return res.status(200).send(Utils.filter(model.schema.obj, user, 0));
	} catch (err) {
		console.error("Error modifyUserById: %s", err);
		next(new customError(err.message, 400))
	}
}

exports.confirmUser = async (req, res, next) => {
	try {
		if (req.user.status == 'Created')
		{
			await model.updateOne({_id: req.user._id}, {status: 'Active'});
			return res.status(200).send({'token': Crypto.createToken(await model.findOne({_id: req.user._id}))});
		}
		throw new Error('Bad token');
	} catch (err) {
		console.error("Error confirm user: %s", err);
		if (err.message === 'Bad token')
			next(new customError(err.message, 401))
		else
			next(new customError(err.message, 400))
	}		
}

exports.resendMail = async (req, res, next) => {
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
		next(new customError(err.message, 400))
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
		password: Joi.string().min(8).max(30).required(),
		picture: Joi.string()
	};
	return Joi.validate(user, schema);
}
