const playlistModel 	= require('../models/playlist');
const config 			= require('../config/config');
const request 			= require('request-promise');
const customError = require('../modules/customError');

module.exports = { 
	getPlaylists: async (req, res, next) => {
		try {
			res.status(200).json(await playlistModel.find())
		} catch (err) {
			next(new customError(err.message, 400))
		}
	},
	getPlaylistsByUser: async (req, res, next) => {
		try {
			let localPlaylists = await playlistModel.find({idUser: req.user._id})
			let options = {
				method: 'GET',
				uri: config.deezer.apiUrl + '/user/me/playlists',
				qs: {
					"access_token": req.user.deezerToken
				},
				json: true
			};
			let deezerPlaylists = await request(options)
			if (deezerPlaylists.data)
				localPlaylists = [...localPlaylists, ...deezerPlaylists.data]
			res.status(200).json(localPlaylists)
		} catch (err) {
			next(new customError(err.message, 400))
		}
	},
	getPlaylistById: async (req, res, next) => {
		try {
			let playlist = {}
			if (!Number(req.params.id))
				playlist = await playlistModel.findOne({'_id': req.params.id})
			else {
				
				let options = {
					method: 'GET',
					uri: config.deezer.apiUrl + '/playlist/' + req.params.id,
					json: true
				};
				if (req.user.deezerToken)
					options.qs = {"access_token": req.user.deezerToken};
				playlist = await request(options)
				if (playlist.id) {
					return res.status(200).json(playlist);
				}
				playlist = {}
			}
			res.status(200).json(playlist || {});
		} catch (err) {
			console.log("Bad Request getPlaylistUserById" + err)
			next(new customError(err.message, 400));
		}
	},
	getPlaylistUserById: async (req, res, next) => {
		try {
			let playlist = {}
			if (!Number(req.params.id))
				playlist = await playlistModel.findOne({'_id': req.params.id, idUser: req.user._id})
			else {
				let options = {
					method: 'GET',
					uri: config.deezer.apiUrl + '/playlist/' + req.params.id,
					json: true
				};
				playlist = await request(options)
				if (playlist.id && playlist.creator.id == req.user.deezerId) {
					return res.status(200).json(playlist);
				}
				playlist = {}
			}
			res.status(200).json(playlist || {});
		} catch (err) {
			console.log("Bad Request getPlaylistUserById" + err)
			next(new customError(err.message, 400))
		}
	},
	postPlaylist: async (req, res, next) => {
		console.log('posting playlist');
		try {
			req.body.idUser = req.user._id
			if (!req.body.title)
				throw new Error('No title')
			if (!req.body.creator)
			{
				req.body.creator = {
					id: req.user.deezerId,
					name: req.user.login,
					tracklist: req.user.deezerId ? config.deezer.apiUrl + '/user/' + req.user.deezerId + '/flow' : undefined,
					type: 'user'
				}
			}
			console.log(req.body)
			let playlist = await playlistModel.create(req.body);
			res.status(201).json(playlist);
		} catch (err) {
			console.log(err)
			next(new customError(err.message, 400))
		}
	},
	putPlaylistById: async (req, res, next) => {
		try {
			playlist = await playlistModel.findOneAndUpdate({_id: req.params.id, idUser: req.user._id}, req.body, {new: true})
			res.status(200).json(playlist);
		} catch (err) {
			console.log("Bad Request putPlaylistById" + err)
			next(new customError(err.message, 400))
		}
	},
	addTrackToPlaylistById: async (req, res, next) => {
		try {
			if (!Number(req.params.id)) {
				let options = {
					method: 'GET',
					uri: config.deezer.apiUrl + '/track/' + req.body.id,
					json: true
				};
				let track = await request(options)
				if (!track.id)
					throw Error('No track found')
				if (!await playlistModel.findOne({_id: req.params.id, idUser: req.user._id, 'tracks.data': {$elemMatch: {id: track.id}}})) {
					await playlistModel.updateOne({_id: req.params.id, idUser: req.user._id},
						{$push: {'tracks.data': track}}
					)
				} else {
					throw Error('This song already exists in this playlist')
				}
			}
			else {
				let options = {
					method: 'POST',
					uri: config.deezer.apiUrl + '/playlist/' + req.params.id + '/tracks',
					json: true,
					qs: {
						"access_token": req.user.deezerToken,
						"songs": req.body.id
					}
				};
				playlist = await request(options)
				if (playlist !== true)
					throw playlist.error.message
			}
			res.status(200).send({message: 'Track added'});
		} catch (err) {
			console.log("Bad Request addTrackToPlaylistById" + err)
			next(new customError(err.message, 400))
		}
	},
	deletePlaylistById: async (req, res, next) => {
		try {
			await playlistModel.deleteOne({_id: req.params.id, idUser: req.user._id})
			res.status(204).json({message: 'PLaylist deleted'});
		} catch (err) {
			console.log("Bad Request deletePlaylistById" + err)
			next(new customError(err.message, 400))
		}
	},
	deleteTrackPlaylistById: async (req, res, next) => {
		
		try {
			console.log("Body SWIFT -> ")
			console.log(req.body)
			if (!Number(req.params.id)) {
				await playlistModel.updateOne({_id: req.params.id, idUser: req.user._id},
					{$pull: {'tracks.data': {id: req.params.trackId}}}
				)
			} else {
				let options = {
					method: 'DELETE',
					uri: config.deezer.apiUrl + '/playlist/' + req.params.id + '/tracks',
					json: true,
					qs: {
						"access_token": req.user.deezerToken,
						"songs": req.params.trackId
					}
				};
				playlist = await request(options)
				if (playlist !== true)
					throw playlist.error.message
			}
			res.status(204).json({message: 'Track deleted'});
		} catch (err) {
			console.log("Bad Request deletePlaylistById" + err)
			next(new customError(err.message, 400))
		}
	}
};
