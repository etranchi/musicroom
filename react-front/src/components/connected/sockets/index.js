import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_API_URL);

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