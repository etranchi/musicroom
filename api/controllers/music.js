const music = require('../models/music');
const config = require('../config/config');
const request = require('request');

exports.getMusics = async (req, res) => {
	music.find(null, (err, event) => {
			if (err) res.status(400).json(err);
			res.status(200).json(event);
	});
}

exports.getMusicById = (req, res) => {
	music.findOne({'id':req.params.id}, (err, event) => {
		if (err)
			res.json(err)
		else if (event == null) 
		{
			request(
			{uri: config.deezer.apiUrl + '/track/' + req.params.id},
			(err, head, body) => {
				if (err)
					res.json(err)
				music.create(JSON.parse(body), (err, event) => {
					if(err) return res.status(400).json(err);
					res.status(200).json(event);
				});
			})
		} else
			res.status(200).json(event);
	});
}

exports.postMusicVote = (req, res) => {
	music.create(req.body, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}

exports.deleteMusicById = (req, res) => {
	music.findOneAndDelete({'id':req.params.id}, (err, event) => {
		if(err) return res.status(400).json(err);
		res.status(200).json(event);
	});
}