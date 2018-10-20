const playlist = require('./model');

exports.getPlaylists = (req, res) => {
	res.json(
			[
			{
				'id': '1',
				'musics':
					[
					'toto and the jumbo',
					'titi and the jumbi'
					]
			},
			{
				'id': '2',
				'musics':
					[
					'tutu and the jumbu',
					'tata and the jumba'
					]
			},

			]);
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
