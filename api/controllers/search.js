const config = require('../config/config');
const request = require('request');
const customError = require('../modules/customError');
const playlistModel 	= require('../models/playlist');
const moduleUrl = '/search';
const requestPromise = require('request-promise');

module.exports = {
	search: (req, res, next) => {
		if (Object.keys(req.query).length === 0)
			res.status(400).json("error");
		console.log(req.query);
		console.log(config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q);
		request(
			{uri: config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q},
			(err, head, body) => {
				if (err)
					next(new customError(err.message, err.code))
				res.json(JSON.parse(body));
			})
	},
	searchAlbum: (req, res, next) => {
		if (Object.keys(req.query).length === 0)
			res.status(400).json("error");
		console.log(req.query);
		console.log(config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q);
		request(
			{uri: config.deezer.apiUrl + moduleUrl + '/album ' + '?q=' + req.query.q},
			(err, head, body) => {
				if (err)
					next(new customError(err.message, err.code))
				res.json( JSON.parse(body));
			})
	},
	searchTrack: (req, res, next) => {
		if (Object.keys(req.query).length === 0)
			res.status(400).json("error");
		console.log(req.query);
		console.log(config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q);
		request(
			{uri: config.deezer.apiUrl + moduleUrl + '/track ' + '?q=' + req.query.q},
			(err, head, body) => {
				if (err)
					next(new customError(err.message, err.code))
				res.json(JSON.parse(body));
			})
	},
	searchPlaylist: async  (req, res, next) => {
		try {
			if (Object.keys(req.query).length === 0 || req.query.q === "")
				res.status(200).send([])
			let criteria = new RegExp(req.query.q || "", 'i')
			let allPlaylist = await playlistModel
				.find({$and: [{
					idUser: {$ne: req.user._id},
					members: {$ne: req.user._id},
					public: true,
					"title" : {$regex: criteria}}
				]})
			let options = {
				method: 'GET',
				uri: config.deezer.apiUrl  + moduleUrl + '/playlist?q=' + encodeURIComponent(req.query.q),
				json: true
			};
			playlist = await requestPromise(options)
			if (playlist.total > 0) {
				allPlaylist = allPlaylist.concat(playlist.data)
			}
			res.status(200).send(allPlaylist)
		} catch (err) {
			next(new customError(err.message, 400))
		}
	},
	searchArtist: (req, res, next) => {
		if (Object.keys(req.query).length === 0)
			res.status(400).json("error");
		console.log(req.query);
		console.log(config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q);
		request(
			{uri: config.deezer.apiUrl + moduleUrl + '/artist ' + '?q=' + req.query.q},
			(err, head, body) => {
				if (err)
					next(new customError(err.message, err.code))
				res.json(JSON.parse(body));
			})
	}
}
