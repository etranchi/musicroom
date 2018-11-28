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
  socket.on('updatePLaylist', async (playlistId) => {
    console.log("JE SUIS LA ET JE VAIS updatePLaylist")
    let playlist = await ftSocket.sendPlaylist(playlistId)
    playlistBlocked.splice(playlistBlocked.indexOf(playlistId), 1)
    socket.broadcast.emit('playlistUpdated', playlist)
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

  /* Socket For LiveEvent */
  socket.on('getRoomPlaylist', (roomID) => {
    console.log("[Socket] -> getRoomPlaylist")
    
    let room = ftSocket.getRoom(roomID);
    if (room)
      io.sockets.in(room.id).emit('getRoomPlaylist', room.tracks)
    else
      return ;
  });

  socket.on('createRoom', (roomID, tracks, event) => {
    console.log("[Socket] -> createRoom")
    
    let room = ftSocket.getRoom(roomID);
    if (!room)
    {
      console.log("[Socket] ->  Room Created")
      room = ftSocket.createRoom(roomID, tracks, event)
      io.sockets.in(room.id).emit('createRoom', room.tracks, "ok")
    }
    else {
      console.log("[Socket] ->  Room Exist")
      socket.emit('createRoom', room.tracks, "err")
    }
  });

  socket.on('joinRoom', (roomID) => {
    console.log("[Socket] -> joinRoom", roomID)

    let room = ftSocket.getRoom(roomID)
    if (room) {
      socket.join(room.id);
      io.sockets.in(room.id).emit('joinRoom', true)
    }
    else  sockets.emit('joinRoom', false)
  });
  socket.on('leaveRoom', (roomID) => {
    console.log("Leaving Room")
    io.sockets.in(roomID).emit('leaveRoom', 'someone leave room')
     socket.leave(roomID)
  });
  socket.on('updateTracks', (roomID, tracks) => {
    console.log("[Socket] -> updateTracks")

    let room = ftSocket.getRoom(roomID)
    if (room)
    {
      room.tracks = tracks
      room = ftSocket.updateRoom(room)
      io.sockets.in(room.id).emit('updateScore', room.tracks)
    }
    else
      return  io.sockets.in(room.id).emit('updateTracks', 'fail');
  });
  socket.on('updateScore', (roomID, trackID, points) => {
    console.log("[Socket] -> updateScore")

    let room = ftSocket.getRoom(roomID)
    if (room)
    {
      room = ftSocket.updateScore(room, trackID, points)
      room = ftSocket.updateRoom(room)
      io.sockets.in(room.id).emit('updateScore', room.tracks)
    }
    else
      return  io.sockets.in(room.id).emit('updateScore', 'fail');
  });
  /* Socket for update socket and send new value */
  socket.on('updateEvent', (roomID, newEvent) => {
    console.log("[Socket] -> updateEvent")
    console.log(io.sockets.adapter.rooms) 
      ftSocket.saveNewEvent(newEvent);
      console.log("Event Updated")
      io.sockets.in(roomID).emit('updateEvent', newEvent);
  });

});

httpsServer.listen(config.port, config.host);

module.exports = httpsServer;
