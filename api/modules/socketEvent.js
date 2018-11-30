'use strict';

const ftSocket = require('./socket');

module.exports = function (io) {
    let playlistBlocked = []

    io.on('connection', (socket) => {

        /* Socket For Playlist */

        socket.on('updatePlaylist', async (playlistId) => {
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
                setTimeout(() => {
                    if (playlistBlocked.indexOf(playlistId) !== -1) {
                        io.in(playlistId).emit('playlistUpdated');
                        console.log("UNLOCK")
                    }
                }, 5000)
            }
            socket.to(playlistId).emit('blockPlaylist')
        });

        socket.on('joinPlaylist', (playlistId) => {
            console.log("[Socket] -> joinPlaylist", playlistId)
            socket.join(playlistId);
        });
        socket.on('leavePlaylist', (playlistId) => {
            console.log("[Socket] -> leavePlaylist")
            socket.leave(playlistId);
        });


        /* Socket For LiveEvent */
        /* Store array of track object, store like, unlike in */

        socket.on('getRoomPlaylist', (roomID) => {
            console.log("[Socket] -> getRoomPlaylist")

            let room = ftSocket.getRoom(roomID);
            if (room)
            {
                console.log("[Socket] -> getRoomPlaylist ", room.tracks.length)
                io.sockets.in(room.id).emit('getRoomPlaylist', room.tracks)
            }
            else
            {
                console.log("[Socket] -> getRoomPlaylist fail ")
                return;
            }
        });

        socket.on('createRoom', (roomID, tracks, event) => {
            console.log("[Socket] -> createRoom")

            let room = ftSocket.getRoom(roomID);
            if (!room) {
                console.log("[Socket] ->  Room Created")
                room = ftSocket.createRoom(roomID, tracks, event)
                socket.join(room.id);
                io.sockets.in(room.id).emit('createRoom', room.tracks, "ok")
            } else {
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
            } else sockets.emit('joinRoom', false)
        });
        socket.on('leaveRoom', (roomID) => {
            console.log("Leaving Room")
            io.sockets.in(roomID).emit('leaveRoom', 'someone leave room')
            socket.leave(roomID)
        });
        socket.on('updateTracks', (roomID, tracks) => {
            console.log("[Socket] -> updateTracks")

            let room = ftSocket.getRoom(roomID)
            if (room) {
                room.tracks = tracks
                room = ftSocket.updateRoom(room)
                io.sockets.in(room.id).emit('updateScore', room.tracks)
            } else
                return io.sockets.in(room.id).emit('updateTracks', 'fail');
        });
        socket.on('updateTrack', (roomID, track) => {
            let room = ftSocket.getRoom(roomID)
            if (room) {
                room.tracks.forEach(music => {
                    if (music._id === track._id)
                    {
                        console.log("track Updated")
                        music = track
                    }
                    
                });
            }
        });
        socket.on('updateScore', (roomID, trackID, points, userID) => {
            console.log("[Socket] -> updateScore")

            let room = ftSocket.getRoom(roomID)
            if (room) {
                console.log("[Socket] -> updateScore ", room.tracks.length)
                room = ftSocket.updateScore(room, trackID, points, userID)
                room = ftSocket.updateRoom(room)
                io.sockets.in(room.id).emit('updateScore', room.tracks)
            } else
            {
                console.log("[Socket] -> updateScore fail")
                return io.sockets.in(room.id).emit('updateScore', 'fail');
            }
        });
        /* Socket for update socket and send new value */
        socket.on('updateEvent', (roomID, newEvent) => {
            console.log("[Socket] -> updateEvent")
            console.log(io.sockets.adapter.rooms)
            ftSocket.saveNewEvent(newEvent);
            console.log("Event Updated")
            io.sockets.in(roomID).emit('updateEvent', newEvent);
        });

        socket.on('updatePlayer', (roomID, newEvent) => {
            console.log("[Socket] -> updatePlayer");
            io.sockets.in(roomID).emit('updatePlayer', newEvent);
        })
    });
};