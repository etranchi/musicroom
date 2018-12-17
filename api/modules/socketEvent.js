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
        socket.on('getRoomPlaylist', async (roomID) => {
            console.log("[Socket] -> getRoomPlaylist")
            try {
                let event = await ftSocket.getEvent(roomID);
            console.log(event)
            io.sockets.in(roomID).emit('getRoomPlaylist', event.playlist.tracks.data)
            } catch (e) {
                io.sockets.in(roomID).emit('error', e.message)
            }

            
        });

        socket.on('createRoom', (roomID) => {
            socket.join(roomID);
            console.log("Nb clients in room " + roomID + " -> " + io.sockets.adapter.rooms[roomID].length)
        });
        socket.on('leaveRoom', (roomID) => {
            console.log("[Socket] -> leaveRoom")
            socket.leave(roomID);
            if (io.sockets.adapter.rooms[roomID])
                console.log("Nb clients in room " + roomID + " -> " + io.sockets.adapter.rooms[roomID].length)
            else
                console.log("No more room for " + roomID)
        });
        // socket.on('closeRoom', (roomID) => {
        //     console.log("[Socket] -> closeRoom")

        //     let room = ftSocket.getRoom(roomID)
        //     if (room) {
        //         ftSocket.deleteRoom(roomID);
        //         io.sockets.in(room.id).emit('closeRoom');
        //     }
        // });
        socket.on('updateTracks', async (roomID, tracks) => {
            try {
            console.log("[Socket] -> updateTracks")
              /* For Swift Team */
              if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                tracks = obj.tracks
            }
            let event = await ftSocket.updateEventTracks(roomID, tracks)
            /* =============== */
            io.sockets.in(roomID).emit('updateTracks', event.playlist.tracks.data)
            // room.tracks = tracks
            // if (room.tracks[0] && !room.tracks[0].status)
            //     room.tracks[0].status = 1
            // io.sockets.in(roomID).emit('updateTracks', room.tracks)
        } catch (e) {
            console.log(e)
            io.sockets.in(roomID).emit('error', e.message)
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
        socket.on('updateScore', async (roomID, userCoord) => {
            console.log("roomid -> " + roomID)
            try {
              /* For Swift Team */
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                userCoord = obj.userCoord
            }
            /* =============== */
            let event = await ftSocket.getEvent(roomID)
            let isClose = event.public ? true : ftSocket.checkDistance(event, userCoord)
            if (event.distance_required && !isClose)
                return io.sockets.in(roomID).emit('updateScore', 'Vous n\'êtes pas assez proche');

            
            io.sockets.in(roomID).emit('updateScore', event.playlist.tracks.data)
            // let room = ftSocket.getRoom(roomID)

            // if (room) {
            //     let isClose = ftSocket.checkDistance(room.event, userCoord)
            //     if (room.event.distance_required && !isClose)
            //         return io.sockets.in(room.id).emit('updateScore', 'Vous n\'êtes pas assé proche');
            //     room = ftSocket.updateScore(room, trackID, points, userID)
            //     room = ftSocket.updateRoom(room)
            //     io.sockets.in(room.id).emit('updateScore', room.tracks)
            // }
        } catch (e) {
            console.log(e)
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
        socket.on('updateStatus', (roomID, trackID) => {
            console.log("[Socket] -> updateStatus");
            /* For Swift Team */
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                trackID = obj.trackID
            }
            /* =============== */
            let room    = ftSocket.getRoom(roomID)
            console.log(room);
            let tracks  = [];
            if (room) {
                tracks = ftSocket.updateStatus(room, status, trackID, secondTrackID);
                io.sockets.in(roomID).emit('updateStatus', tracks);
            }
        })
        /* Socket for Player */
        socket.on('updatePlayer', (roomID, newEvent, data) => {
            console.log("[Socket] -> updatePlayer");
            /* For Swift Team */
            if (typeof roomID === 'object') {
                let obj = JSON.parse(roomID);
                roomID = obj.roomID
                newEvent = obj.newEvent
            }
            if (newEvent === 'pause' || newEvent === 'play')
                ftSocket.updatePlayStatus(roomID, newEvent === 'pause' ? false : true)
            /* =============== */
            console.log(newEvent)
            io.sockets.in(roomID).emit('updatePlayer', newEvent, data);
        })
    });
    io.on('disconnect', (socket) => {
        console.log("IN SOCKET DISCONNECT", socket)
    });
};
