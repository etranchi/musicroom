import openSocket from 'socket.io-client';

<<<<<<< HEAD
const socket = openSocket('https://192.168.99.100:4242');

=======
const socket = openSocket(process.env.REACT_APP_API_URL);
>>>>>>> 8579b7d214e387e087e5519af50d83e8e62eb08a
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