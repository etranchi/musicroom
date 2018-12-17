import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SOCKET_URL,{
    transports: [ 'websocket', 'polling' ]
  });

function joinPlaylist (playlistId) {
    console.log("je join la plalist -> " + playlistId)
    socket.emit("joinPlaylist", playlistId)
}

function leavePlaylist (playlistId) {
    console.log("je leave la plalist -> " + playlistId)
    socket.emit("leavePlaylist", playlistId)
}

function updatePlaylist(playlistId) {
    socket.emit('updatePlaylist', playlistId);
}

function blockSocketEvent(playlistId, roomID) {
    socket.emit('blockPlaylist', playlistId, roomID);
}

function createEventLive (tracks) {
    socket.emit("createEventLive", tracks)
}

function createRoom (roomID, userID) {
    socket.emit("createRoom", roomID, userID)
}
function joinRoom (roomID) {
    socket.emit("joinRoom", roomID)
}
function getRoomPlaylist (roomID) {
    socket.emit("getRoomPlaylist", roomID)
}
function updateEvent (roomID, newEvent) {
    socket.emit("updateEvent", roomID, newEvent)
}
function updateTracks (roomID, tracks) {
    socket.emit("updateTracks", roomID, tracks)
}
function updateTrack (roomID, track) {
    socket.emit("updateTrack", roomID, track)
}
function updateScore (roomID, tracksID, pointsD, userID, userCoord) {
    socket.emit("updateScore", roomID, tracksID, pointsD, userID, userCoord)
}
function updatePlayer (roomID, event) {
    console.log("trying to update player with params [roomId -> " + roomID + ", event -> " + event + "]");
    socket.emit("updatePlayer", roomID, event)
}
function updateStatus (roomID, status, trackID, secondTrackID) {
    console.log('la')
    socket.emit("updateStatus", roomID, status, trackID, secondTrackID)
}
function leaveRoom (roomID, userID) {
    socket.emit("leaveRoom", roomID, userID)
}
function closeRoom (roomID) {
    socket.emit("closeRoom", roomID)
}
/* TEST socket */
function testJoinRoom (roomID, userName) {
    socket.emit("testJoinRoom", roomID, userName)
}
function message (roomID, msg) {
    socket.emit("message", roomID, msg)
}
export {    
    message, 
    testJoinRoom, 
    updatePlayer, 
    joinPlaylist, 
    leavePlaylist, 
    updatePlaylist, 
    socket, 
    blockSocketEvent, 
    getRoomPlaylist, 
    updateTrack, 
    updateScore, 
    joinRoom, 
    createRoom, 
    createEventLive, 
    updateEvent, 
    updateTracks, 
    leaveRoom, 
    closeRoom, 
    updateStatus
};
