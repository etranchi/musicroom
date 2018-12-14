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
            console.log("Nb clients in room " + playlistId + " -> " + io.sockets.adapter.rooms[playlistId].length)
        });
        socket.on('leavePlaylist', (playlistId) => {
            console.log("[Socket] -> leavePlaylist")
            socket.leave(playlistId);
            if (io.sockets.adapter.rooms[playlistId])
                console.log("Nb clients in room " + playlistId + " -> " + io.sockets.adapter.rooms[playlistId].length)
            else
                console.log("No more room for " + playlistId)
        });
        /* Socket For LiveEvent */
        socket.on('getRoomPlaylist', (roomID) => {
            console.log("[Socket] -> getRoomPlaylist")

            let room = ftSocket.getRoom(roomID);
            if (room)
            {
                io.sockets.in(room.id).emit('getRoomPlaylist', room.tracks)
            }
            else
                return;
        });

        socket.on('createRoom', async (roomID, userID) => {
            try {
                console.log("[Socket] -> createRoom")
                let room = ftSocket.getRoom(roomID);
                if (!room) {
                    console.log('room created')
                    room = await ftSocket.createRoom(roomID, userID)
                    socket.join(roomID);
                    io.sockets.in(roomID).emit('createRoom', room.tracks, true)
                } else if (ftSocket.joinRoom(room, userID)) {
                    console.log('room joined')
                    socket.join(roomID);
                    io.sockets.in(roomID).emit('createRoom', room.tracks, true)

                } else {
                    console.log('room user exist')
                    socket.join(roomID);
                    io.sockets.in(roomID).emit('createRoom', room.tracks, false)
                }
            } catch (e) {
                console.log("Error create room -> " + e)
                return io.sockets.in(roomID).emit('error', e.message)
            }
        });
        socket.on('leaveRoom', (roomID, userID) => {
            console.log("[Socket] -> leaveRoom")
            let room = ftSocket.getRoom(roomID);
            let index = 0;
            if (room) {
                if ((index = room.users.indexOf(userID)) !== -1) {
                    room.users.splice(index, 1)
                    room = ftSocket.updateRoom(room)
                }
                socket.leave(roomID);
            }
        });
        socket.on('closeRoom', (roomID) => {
            console.log("[Socket] -> closeRoom")

            let room = ftSocket.getRoom(roomID)
            if (room) {
                ftSocket.deleteRoom(roomID);
                io.sockets.in(room.id).emit('closeRoom');
            }
        });
        socket.on('updateTracks', (roomID, tracks) => {
            console.log("[Socket] -> updateTracks")
            let room = ftSocket.getRoom(roomID)
            if (room) {
                room.tracks = tracks
                if (room.tracks[0] && !room.tracks[0].status)
                    room.tracks[0].status = 1
                io.sockets.in(room.id).emit('updateTracks', room.tracks)
            }
        });
        socket.on('updateTrack', (roomID, track) => {
            console.log("[Socket] -> updateTrack")
              /* For Swift Team */
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                track = obj.track
            }
            /* =============== */
            let room = ftSocket.getRoom(roomID)
            if (room) {
                room.tracks.forEach(music => {
                    if (music._id === track._id)
                        music = track
                });
            }
        });
        socket.on('updateScore', (roomID, trackID, points, userID, userCoord) => {
            console.log("[Socket] -> updateScore")
              /* For Swift Team */
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                trackID = obj.trackID
                points = obj.points
                userID = obj.userID
                userCoord = obj.userCoord
            }
            /* =============== */
            let room = ftSocket.getRoom(roomID)

            if (room) {
                let isClose = ftSocket.checkDistance(room.event, userCoord)
                if (room.event.distance_required && !isClose)
                    return io.sockets.in(room.id).emit('updateScore', 'Vous n\'êtes pas assé proche');
                room = ftSocket.updateScore(room, trackID, points, userID)
                room = ftSocket.updateRoom(room)
                io.sockets.in(room.id).emit('updateScore', room.tracks)
            }
        });
        socket.on('updateEvent', (roomID, newEvent) => {
            console.log("[Socket] -> updateEvent")
              /* For Swift Team */
              console.log("Update Event : ", typeof roomID)
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                newEvent = obj.newEvent
            }
            /* =============== */
            let room = ftSocket.getRoom(roomID)

            if (newEvent._id && room) {
                room.event = newEvent
                room = ftSocket.updateRoom(room)
            }
            ftSocket.saveNewEvent(newEvent);
            io.sockets.in(roomID).emit('updateEvent', newEvent);
        });
        socket.on('updateStatus', (roomID, status, trackID, secondTrackID) => {
            console.log("[Socket] -> updateStatus");
            /* For Swift Team */
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                status = obj.status
                trackID = obj.trackID
                secondTrackID = obj.secondTrackID
            }
            /* =============== */
            let room    = ftSocket.getRoom(roomID)
            let tracks  = [];
            if (room) {
                tracks = ftSocket.updateStatus(room, status, trackID, secondTrackID);
                io.sockets.in(roomID).emit('updateStatus', tracks);
            }
        })
        /* Socket for Player */
        socket.on('updatePlayer', (roomID, newEvent) => {
            console.log("[Socket] -> updatePlayer");
            /* For Swift Team */
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                newEvent = obj.newEvent
            }
            /* =============== */
            console.log(newEvent)
            io.sockets.in(roomID).emit('updatePlayer', newEvent);
        })
    });
    io.on('disconnect', (socket) => {
        console.log("IN SOCKET DISCONNECT", socket)
    });
};
