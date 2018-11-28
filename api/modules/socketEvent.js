'use strict';

const ftSocket = require('./socket');

module.exports = function(io){
    let playlistBlocked = []

    io.on('connection', (socket) => {

        /* Socket For Playlist */

        socket.on('updatePLaylist', async (playlistId) => {
          console.log("JE SUIS LA ET JE VAIS updatePLaylist")
          let playlist = await ftSocket.sendPlaylist(playlistId)
          playlistBlocked.splice(playlistBlocked.indexOf(playlistId), 1)
          socket.to(playlistId).emit('playlistUpdated', playlist)
        });
        socket.on('blockPlaylist', (playlistId) => {
          console.log("BLOCK PLAYLIST -> " + playlistId)
          console.log(playlistBlocked)
          console.log(playlistBlocked.indexOf(playlistId))
          if (playlistBlocked.indexOf(playlistId) === -1) {
            playlistBlocked.push(playlistId)
            console.log("BLOCK PLAYLIST EVENT")
            socket.to(playlistId).emit('blockPlaylist')
          } else {
            socket.to(playlistId).emit('alreadyBlocked')
          }


          socket.on('joinPlaylist', (playlistId) => {
            console.log("[Socket] -> joinPlaylist", playlistId)
            socket.join(playlistId);
          });
          socket.on('leavePlaylist', (playlistId) => {
            console.log("[Socket] -> leavePlaylist")
            socket.leave(playlistId);
          });
        });
      
        /* Socket For LiveEvent */
        /* Store array of track object, store like, unlike in */
      
        socket.on('getRoomPlaylist', (roomID) => {
          console.log("[Socket] -> getRoomPlaylist")
          let room = ftSocket.getRoom(roomID);
          if (room)
            io.sockets.in(room.id).emit('getRoomPlaylist', room.tracks)
          else
            return ;
        });
      
        socket.on('createRoom', (roomID, tracks) => {
          console.log("[Socket] -> createRoom")
          
          let room = ftSocket.getRoom(roomID);
          if (!room) room = ftSocket.createRoom(roomID, tracks)
          io.sockets.in(room.id).emit('createRoom', room.tracks)
        });
      
        socket.on('joinRoom', (roomID) => {
          console.log("[Socket] -> joinRoom", roomID)
      
          let room = ftSocket.getRoom(roomID)
          if (room) {
            socket.join(room.id);
            io.sockets.in(room.id).emit('joinRoom', "Room joined")
          }
          else  sockets.emit('joinRoom', "Wrong ID")
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
    });
};
