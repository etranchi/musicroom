const playlistModel 	= require('../models/playlist');
const config 			= require('../config/config');
const request 			= require('request');
const mongoose 			= require('mongoose');

module.exports = {
	getPlaylists: async (req, res) => {
		playlistModel.find(null, (err, event) => {
				if (err) res.status(400).json(err);
				res.status(200).json(event);
		});
	},
	getPlaylistById: (req, res) => {
		playlistModel.findOne({'id':req.params.id}, (err, event) => {
			if (err) return res.json(err)
			else if (event == null) {
				request(
				{uri: config.deezer.apiUrl + '/playlist/' + req.params.id},
				(err, head, body) => {
					if (err) return res.json(err)
					playlistModel.create(JSON.parse(body), (err, event) => {
						if(err) return res.status(400).json(err);
						return res.status(200).json(event);
					});
				})
			} else return res.status(200).json(event);
		});
	},
	postPlaylist: (req, res) => {
		playlistModel.create(req.body, (err, event) => {
			if(err) return res.status(400).json(err);
			res.status(201).json(event);
		});
	},
	putPlaylistById: (req, res) => {
		playlistModel.findByIdAndUpdate(req.params.id, req.body, {new: true},  (err, event) => {
			if(err) return res.status(400).json(err);
			res.status(200).json(event);
		});
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