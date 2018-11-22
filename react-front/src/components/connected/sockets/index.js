import openSocket from 'socket.io-client';

const socket = openSocket('https://192.168.99.100:4242');

function moveMusic(playlistId) {
    socket.emit('moveMusic', playlistId);
}

function blockSocketEvent(playlistId) {
    socket.emit('blockPlaylist', playlistId);
}

function unblockSocketEvent(playlistId) {
    socket.emit('unblockPlaylist', playlistId);
}


function createEventLive (tracks) {
    socket.emit("createEventLive", tracks)
}

function like (tracksID) {
    socket.emit("like", tracksID)
}

function dislike(tracksID) {
    socket.emit("dislike", tracksID)
}

export { moveMusic, socket, blockSocketEvent, unblockSocketEvent, createEventLive, like, dislike};