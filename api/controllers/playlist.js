const playlistModel 	= require('../models/playlist');
const trackModel 	= require('../models/track');
const config 			= require('../config/config');
const request 			= require('request-promise');
const mongoose 			= require('mongoose');

module.exports = { 
	getPlaylists: async (req, res) => {
		try {
			res.status(200).json(await playlistModel.find())
		} catch (err) {
			res.status(400).json(err)
		}
	},
	getPlaylistById: async (req, res) => {
		try {
			let playlist = null
			if (!Number(req.params.id))
				return res.status(200).json(await playlistModel.findOne({'_id': req.params.id}) || {})
			else
				playlist = await playlistModel.findOne({'id': req.params.id})
			if (!playlist) {
				let options = {
					method: 'GET',
					uri: config.deezer.apiUrl + '/playlist/' + req.params.id,
					json: true
				};
				let rp = await request(options)
				if (rp.id)
				{
					playlist = await playlistModel.create(rp)
					trackModel.insertMany(playlist.tracks.data, (err, event) => {})
				}
			}
			res.status(200).json(playlist || {});
		} catch (err) {
			console.log("Bad Request getPlaylistById" + err)
			res.status(400).json(err);
		}
	},
	postPlaylist: async (req, res) => {
		try {
			req.body.userId = req.user._id
			res.status(201).json(await playlistModel.create(req.body));
		} catch (err) {
			res.status(400).json(err);
		}
	},
	putPlaylistById: async (req, res) => {
		try {
			let event = await playlistModel.updateOne(req.params.id, req.body, {new: true})
			res.status(200).json(event);
		} catch (err) {
			res.status(400).json(err)
		}
	},
	deletePlaylistById: async (req, res) => {
		try {
			await playlistModel.deleteOne({'_id': req.params.id})
			res.status(204).send();
		} catch (err) {
			console.log(err)
			res.status(400).send(err);
		}
	}
};