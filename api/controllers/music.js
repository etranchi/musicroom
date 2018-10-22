const music = require('../models/music');

exports.getMusics = async (req, res) => {
	music.find(null, (err, event) => {
			if (err) res.status(400).json(err);
			res.status(200).json(event);
	});
}

exports.getMusicById = (req, res) => {
	music.findById(req.params.id, (err, event) => {
		if (err) res.status(400).json(err);
		res.status(200).json(event);
	})
}

exports.postMusicVote = (req, res) => {
	music.create(req.body, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}
