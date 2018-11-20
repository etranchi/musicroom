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

let httpsServer = https.createServer(credentials, app);
const io = socketIo(httpsServer)

let options = config.swagger
options.basedir = __dirname
options.files = ["./routes/**/*.js"]
expressSwagger(options)

io.on('connection', (socket) => {
  socket.on('addPlaylist', (playlistId) => {
    // BROADCAST NEW PLAYLIST io.emit('newPlaylist', () => {})
    console.log("addPlaylist -> ");
    console.log(playlistId);
  });
  socket.on('delPlaylist', (playlistId) => {
    console.log("delPlaylist -> ");
    console.log(playlistId);
  });
  socket.on('addMusicInPlaylist', (musicId) => {
    console.log("addMusicInPlaylist -> ");
    console.log(musicId);
  });
  socket.on('delMusicInPlaylist', (musicId) => {
    console.log("delMusicInPlaylist -> ");
    console.log(musicId);
  });
  socket.on('moveMusic', (playlistId) => {
    // add a hash of plylistId if playlistId in hash block moves
    console.log("moveMusic -> ");
    console.log(playlistId);
  });
});

httpsServer.listen(config.port, config.host);

module.exports = httpsServer;
