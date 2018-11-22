'use strict'

const modelEvent = require('../models/event');
const ObjectId = require('mongodb').ObjectID;
// geolib pour le calcul de radius
module.exports = {
	getEvents: async (req, res) => {
		try {
			res.status(200).json(await modelEvent.find());
		} catch (err) {
			res.status(400).json(err);
		}
	},
	getEventById: async (req, res) => {
		try {
			res.status(200).json(await modelEvent.findOne({'_id':req.params.id}));
		} catch (err) {
			res.status(400).json(err);
		}
	},
	postEvent: async (req, res) => {
		try {
			req.body = JSON.parse(req.body.body);
			console.log('1')
			if (req.file && req.file.filename) {
				console.log('2', req.file.filename)
				req.body.picture = req.file.filename
			}
			console.log('3')
			let event = await modelEvent.create(req.body)
			console.log('4')
			res.status(200).send(event)
		} catch (err) {
			console.log("ERROR POST EVENT -> " + err)
			res.status(400).json(err);
		}
	},
	putEventById: async (req, res) => {
		console.log("Je suis ici", req.params)
		try {
			// ADD JOI.VALIDATION
			let test = await modelEvent.updateOne({_id: req.params.id}, req.body, {new: true})
			res.status(200).json(test)
		} catch (err) {
			res.status(400).json(err);
		}
	},
	deleteEventById: async (req, res) => {
		try {
			await modelEvent.deleteOne({'_id': req.params.id})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			res.status(400).send(err);
		}
	}
};



// if (req.file && req.file.filename) {
// 	console.log("Resize Image")
// 	name = req.file.filename

// 	let smallPicture 	= await sharp( "./public/eventPicture/default/" + name).resize(320)
// 	let mediumPicture 	= await sharp( "./public/eventPicture/default/" + name).resize(480)
// 	let largePicture 	= await sharp( "./public/eventPicture/default/" + name).resize(800)
	
// 	await fs.writeFile("./public/eventPicture/small/" + name, smallPicture.toBuffer(), (err, res) => {

// 	});
// 	await fs.writeFile("./public/eventPicture/medium/" + name, mediumPicture.toBuffer(), (err, res) => {

// 	});
// 	await fs.writeFile("./public/eventPicture/large/" + name, largePicture.toBuffer(), (err, res) => {

// 	});

// 	console.log("Image resized")
// }