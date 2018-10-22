'use strict'

const playlist = require('../../models/playlist');

exports.getPlaylists = async (req, res) => {
	try {
		let playlists = await manager.getUsers();
		res.status(200).json(playlists);
	} catch (err) {
		res.status(400).send(err)
	}
}

exports.getPlaylistById = (req, res) => {
	res.json(
			{
				'id': '1',
				'musics':
					[
					'toto and the jumbo',
					'titi and the jumbi'
					]
			});
}

exports.postPlaylist = (req, res) => {
	res.json(
			{
				'id' : 'last',
				'musics':
					[
					'toto and the jumbo',
					'titi and the jumbi'
					]
			});
}

exports.putPlaylistById = (req, res) => {
	res.json(
			{
				'id' : '1',
				'data': 'newdata'
			});
}

exports.deletePlaylistById = (req, res) => {
	res.json(
			{
				'delete': 'success'
			});
}
