'use strict'

const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/', routes);

app.get('/', ( req, res) =>  {
	res.json(403, {'jules':'toto'});
});

module.exports = app;
