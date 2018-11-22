import openSocket from 'socket.io-client';

const socket = openSocket('https://192.168.99.101:4242');

function moveMusic(playlistId, roomID) {
    socket.emit('moveMusic', playlistId, roomID);
}

function blockSocketEvent(playlistId, roomID) {
    socket.emit('blockPlaylist', playlistId, roomID);
}

function unblockSocketEvent(playlistId, roomID) {
    socket.emit('unblockPlaylist', playlistId, roomID);
}


function getEventLive (tracks, roomID) {
    socket.emit("getEventLive", tracks, roomID)
}

function updateScore (tracks, tracksI, points, roomID) {
    socket.emit("updateScore", tracks, tracksI, points, roomID)
}
export { moveMusic, socket, blockSocketEvent, unblockSocketEvent, getEventLive, updateScore};