'use strict'
const express = require('express');
const app = express();
const oauth = require('./modules/oauth/routes');
const config = require('./config/config.json');

module.exports = function() {
  var app = express();
  return app;
};

app.use('/oauth', oauth);


app.get('/', ( req, res) =>  {
	res.json(403, {'jules':'toto'});
});
app.listen(config.port, config.host);
