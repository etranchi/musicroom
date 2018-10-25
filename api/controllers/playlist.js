const playlist = require('../models/playlist');

exports.getPlaylists = async (req, res) => {
	playlist.find(null, (err, event) => {
			if (err) res.status(400).json(err);
			res.status(200).json(event);
	});
}

exports.getPlaylistById = (req, res) => {
	playlist.findById(req.params.id, (err, event) => {
		if (err) res.status(400).json(err);
		res.status(200).json(event);
	})
}

exports.postPlaylist = (req, res) => {
	playlist.create(req.body, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}

exports.putPlaylistById = (req, res) => {
	playlist.findByIdAndUpdate(req.params.id, req.body, {new: true},  (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}

exports.deletePlaylistById = (req, res) => {
	playlist.findByIdAndRemove(req.params.id, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}
