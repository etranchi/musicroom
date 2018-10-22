'use strict'

const express = require('express');
const app = express();
const routes = require('./routes')
const db = require('./db/mongo.js');
const config = require('./config/config.json');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/', routes);

app.get('/', ( req, res) =>  {
	res.status(200).json({'jules':'toto'});
});

app.listen(config.port, config.host);

module.exports = app;
