exports.index = (req, res) => {
	res.json(200, {'deezer_res' : 'toto'});
}

exports.callback = (req, res) => {
	res.json(200, {'login': 'success'});
}

exports.login_error = (req,res) => {
	res.json(403, {'login': 'failed'});
}


