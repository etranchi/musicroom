import openSocket from 'socket.io-client';

const socket = openSocket('https://192.168.99.100:4242');
function addInPlaylist(musicId) {
    socket.emit('addMusicInPlaylist', musicId);
}
export { addInPlaylist };