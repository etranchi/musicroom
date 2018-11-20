import openSocket from 'socket.io-client';

const socket = openSocket('https://192.168.99.100:4242');
function moveMusic(playlistId) {
    socket.emit('moveMusic', playlistId);
    // UPDATE PARENT STATE TO RERENDER NEW PLAYLIST
    socket.on('musicMoved', playlist => console.log("IDJDICDICJDICJDCIJDCIJCDI" + playlist));
}
function musicMoved() {
    
}
export { moveMusic, musicMoved };