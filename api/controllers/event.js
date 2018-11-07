'use strict'

const modelEvent = require('../models/event');
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
		req.body = JSON.parse(req.body.body);
		try {
			if (req.file && req.file.filename) req.body.picture = req.file.filename
			res.status(200).json(await modelEvent.create(req.body))
		} catch (err) {
			console.log("ERR %s", err)
			res.status(400).json(err);
		}
	},
	putEventById: async (req, res) => {
		try {
			// ADD JOI.VALIDATION
			res.status(200).json(await modelEvent.updateOne({_id: req.params.id}, req.body, {new: true}))
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