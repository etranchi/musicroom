'use strict'

const express = require('express');
const app = express();
const routes = require('./routes')
const db = require('./db/mongo.js');

app.use('/', routes);

app.get('/', ( req, res) =>  {
	res.status(200).json({'jules':'toto'});
});

module.exports = app;
