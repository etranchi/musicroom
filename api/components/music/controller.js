'use strict'
const music = require('../../models/music');

exports.getMusicById = (req, res) => {
	res.json(
			{
				'id': '1',
				'name': 'toto and the jumbo'
			});
}

exports.postMusicVote = (req, res) => {
	res.json(
			{
				'response': 'you vote for some music'
			});
}
