exports.getUsers = (req, res) => {
	res.json(200,
				[
				{
					'id': '1',
					'name': 'Jules'
				},
				{
					'id': '2',
					'name': 'toto'
				}
				]);
}

exports.getUserById = (req, res) => {
	res.json(200,
			{
					'id': '1',
					'name': 'Jules'
			});
}

exports.postUser = (req, res) => {
	res.json(200,
			{
					'id': 'last',
					'name': 'yourname'
			})
}

exports.registerUser = (req, res) => {
	res.json(200,
			{
				'response': 'success'
			});
}

exports.putUserById = (req, res) => {
	res.json(200,
			{
				'id' : '1',
				'name' : 'newname'
			});
}

exports.deleteUserById = (req, res) => {
	res.json(200,
			{
				'delete': 'success'
			});
}
