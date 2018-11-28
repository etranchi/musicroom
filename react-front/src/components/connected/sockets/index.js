import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_API_URL);

function updatePLaylist(playlistId) {
    socket.emit('updatePLaylist', playlistId);
}

function blockSocketEvent(playlistId, roomID) {
    socket.emit('blockPlaylist', playlistId, roomID);
}

function createEventLive (tracks) {
    socket.emit("createEventLive", tracks)
}

function createRoom (roomID, tracks, event) {
    socket.emit("createRoom", roomID, tracks, event)
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
function updateScore (roomID, tracksID, pointsD) {
    socket.emit("updateScore", roomID, tracksID, pointsD)
}
function leaveRoom (roomID) {
    socket.emit("leaveRoom", roomID)
}
export { updatePLaylist, socket, blockSocketEvent, getRoomPlaylist, updateScore, joinRoom, createRoom, createEventLive, updateEvent, updateTracks, leaveRoom};
