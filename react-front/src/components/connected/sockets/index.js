import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_API_URL);

function updatePLaylist(playlistId) {
    socket.emit('updatePLaylist', playlistId);
}

function blockSocketEvent(playlistId) {
    socket.emit('blockPlaylist', playlistId);
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

export { updatePLaylist, socket, blockSocketEvent, createEventLive, like, dislike};