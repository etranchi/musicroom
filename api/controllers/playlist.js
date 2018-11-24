const playlistModel 	= require('../models/playlist');
const config 			= require('../config/config');
const request 			= require('request-promise');

module.exports = { 
	getPlaylists: async (req, res) => {
		try {
			res.status(200).json(await playlistModel.find())
		} catch (err) {
			res.status(400).json(err)
		}
	},
	getPlaylistsByUser: async (req, res) => {
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
			res.status(400).json(err)
		}
	},
	getPlaylistById: async (req, res) => {
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
				playlist = await request(options)
				if (playlist.id) {
					return res.status(200).json(playlist);
				}
				playlist = {}
			}
			res.status(200).json(playlist || {});
		} catch (err) {
			console.log("Bad Request getPlaylistUserById" + err)
			res.status(400).json(err);
		}
	},
	getPlaylistUserById: async (req, res) => {
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
			res.status(400).json(err);
		}
	},
	postPlaylist: async (req, res) => {
		console.log('posting playlist');
		try {
			req.body.idUser = req.user._id
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
			res.status(400).json(err);
		}
	},
	putPlaylistById: async (req, res) => {
		try {
			playlist = await playlistModel.findOneAndUpdate({_id: req.params.id, idUser: req.user._id}, req.body, {new: true})
			res.status(200).json(playlist);
		} catch (err) {
			console.log("Bad Request putPlaylistById" + err)
			res.status(400).send(err);
		}
	},
	addTrackToPlaylistById: async (req, res) => {
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
			res.status(400).send(err);
		}
	},
	deletePlaylistById: async (req, res) => {
		try {
			await playlistModel.deleteOne({_id: req.params.id, idUser: req.user._id})
			res.status(204).json({message: 'PLaylist deleted'});
		} catch (err) {
			console.log("Bad Request deletePlaylistById" + err)
			res.status(400).send(err);
		}
	},
	deleteTrackPlaylistById: async (req, res) => {
		try {
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
			res.status(400).send(err);
		}
	}
};
