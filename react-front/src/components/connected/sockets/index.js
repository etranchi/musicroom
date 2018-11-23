import openSocket from 'socket.io-client';

const socket = openSocket('https://192.168.99.100:4242');

function moveMusic(playlistId, roomID) {
    socket.emit('moveMusic', playlistId, roomID);
}

function blockSocketEvent(playlistId, roomID) {
    socket.emit('blockPlaylist', playlistId, roomID);
}

function unblockSocketEvent(playlistId, roomID) {
    socket.emit('unblockPlaylist', playlistId, roomID);
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
export { moveMusic, socket, blockSocketEvent, unblockSocketEvent, getRoomPlaylist, updateScore, joinRoom, createRoom};