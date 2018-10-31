exports.index = (req, res) => {
	res.status(200).json({'deezer_res' : 'toto'});
}

exports.callback = (req, res) => {
	res.status(200).json({'login': "yo"});
}

exports.login_error = (req,res) => {
	res.status(403).json({'login': 'failed'});
}


