const config = require('../config/config');
const request = require('request');
const customError = require('../modules/customError');
const playlistModel 	= require('../models/playlist');
const moduleUrl = '/search';

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
		if (Object.keys(req.query).length === 0)
			res.status(400).json("error");
		console.log(req.query);
		console.log(config.deezer.apiUrl + moduleUrl + '?q=' + req.query.q);
		try {
			let playlist = await playlistModel.find({"title" : {$regex : ".*" + req.query.q + ".*"}})
			request(
				{uri: config.deezer.apiUrl + moduleUrl + '/playlist ' + '?q=' + req.query.q},
				(err, head, body) => {
					if (err)
						next(new customError(err.message, err.code))
					body = JSON.parse(body);
					let playlists = {
						data: playlist.concat(body.data)
					}
					res.json(playlists);
				})
		}
		catch (err) {
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
