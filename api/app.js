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
const ftSocket = require('./modules/socket');

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

let playlistBlocked = []

this.liveEvent = [];

io.on('connection', (socket) => {
  // socket.on('addPlaylist', (playlistId) => {
  //   console.log("addPlaylist -> ");
  //   console.log(playlistId);
  // });
  // socket.on('delPlaylist', (playlistId) => {
  //   console.log("delPlaylist -> ");
  //   console.log(playlistId);
  // });
  // socket.on('addMusicInPlaylist', (musicId) => {
  //   console.log("addMusicInPlaylist -> ");
  //   console.log(musicId);
  // });
  // socket.on('delMusicInPlaylist', (musicId) => {
  //   console.log("delMusicInPlaylist -> ");
  //   console.log(musicId);
  // });
  socket.on('moveMusic', async (playlistId) => {
    console.log("JE SUIS LA ET JE VAIS EMIT UN EVENT")
    let playlist = await ftSocket.sendPlaylist(playlistId)
    socket.broadcast.emit('musicMoved', playlist)
  });
  socket.on('blockPlaylist', (playlistId) => {
    console.log("BLOCK PLAYLIST -> " + playlistId)
    console.log(playlistBlocked)
    console.log(playlistBlocked.indexOf(playlistId))
    if (playlistBlocked.indexOf(playlistId) === -1) {
      playlistBlocked.push(playlistId)
      console.log("BLOCK PLAYLIST EVENT")
      socket.broadcast.emit('blockPlaylist', playlistId)
    } else {
      socket.emit('alreadyBlocked', playlistId)
    }
  });
  socket.on('unblockPlaylist', (playlistId) => {
    console.log("BEFORE SPLICE")
    console.log(playlistBlocked)
    playlistBlocked.splice(playlistBlocked.indexOf(playlistId), 1)
    console.log("AFTER SPLICE")
    console.log(playlistBlocked)
    console.log("UNBLOCK PLAYLIST EVENT")
    socket.broadcast.emit('unblockPlaylist', playlistId)
  });


  /* Socket For LiveEvent */
  /* Store array of track object, store like, unlike in */

  /* Socket For LiveEvent */
  /* Store array of track object, store like, unlike in */

  socket.on('getEventLive', async (roomID) => {
    console.log("[Socket] -> getEventLive")
    let event = [];
    event = this.liveEvent.forEach(event => {
      if (event.roomID === roomID)
        return event
    });
    io.sockets.in(roomID).emit('createRoom', event.tracks)
  });

  socket.on('createRoom', async (tracks, roomID) => {
    console.log("[Socket] -> createRoom")
    this.liveEvent.push({roomID:roomID,tracks:tracks})
    io.sockets.in(roomID).emit('createRoom', liveEvent.tracks)
  });

  socket.on('joinRoom', async (roomID) => {
    console.log("[Socket] -> joinRoom")
    io.sockets.in(roomID).join(roomID);
  });

  socket.on('updateScore', async (tracks, trackID, points, roomID) => {
    console.log("[Socket] -> updateScore")
    if (tracks && trackID && points) {
      let tmp = await ftSocket.sortTracksByScore(await ftSocket.updateScore(tracks, trackID, points))
      io.sockets.in(roomID).emit('updateScore', await ftSocket.sortTracksByScore(tmp))
    }
    else
      io.sockets.in(roomID).emit('updateScore', await ftSocket.sortTracksByScore(tracks))
  });

});

httpsServer.listen(config.port, config.host);

module.exports = httpsServer;
