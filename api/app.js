'use strict'

const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('./sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('./sslcert/server.crt', 'utf8');
const cors = require('cors');  
const express = require('express');
const app = express();
const routes = require('./routes')
require('./db/mongo.js');
const config = require('./config/config.json');
const bodyParser = require('body-parser');
const expressSwagger = require('express-swagger-generator')(app);
const socketIo = require('socket.io');

const credentials = {key: privateKey, cert: certificate};

app.use(compression());
app.use(helmet());
var corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);
app.get('/', ( req, res) =>  {
	res.status(200).json({"message":"Welcome to Music vroom!"});
});
app.use(function(req, res, next) {
  if (!req.route) {
    let err = new Error('Not found')
    err.status = 404
    return next (err);
  }
  next();
});
app.use(function(err, req, res, next) {
    console.log("Je suis dans le gestionnaire d'erreur -> ")
    if (err.message)
      return res.status(err.status || err.code || 500).send({error: err.message})
    return res.status(500).send({error: "Le serveur a mal"})
});

let httpsServer = https.createServer(credentials, app);
const io = socketIo(httpsServer)
require('./modules/socketEvent')(io);

let options = config.swagger
options.basedir = __dirname
options.files = ["./routes/**/*.js"]
expressSwagger(options)

httpsServer.listen(config.port, config.host);

module.exports = httpsServer;
