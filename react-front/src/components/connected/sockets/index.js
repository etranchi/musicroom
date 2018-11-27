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

function createRoom (roomID, tracks) {
    socket.emit("createRoom", roomID, tracks)
}
function joinRoom (roomID) {
    socket.emit("joinRoom", roomID)
}
function getRoomPlaylist (roomID) {
    socket.emit("getRoomPlaylist", roomID)
}

function updateScore (roomID, tracksID, pointsD) {
    socket.emit("updateScore", roomID, tracksID, pointsD)
}
export { updatePLaylist, socket, blockSocketEvent, getRoomPlaylist, updateScore, joinRoom, createRoom, createEventLive };
