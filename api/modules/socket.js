'use strict';

const playlistModel = require('../models/playlist');


sortTracksByScore = (tracks) => {
    tracks.sort((a, b) => { return a.like < b.like ? 1 : -1 })
    return tracks
}
module.exports = {
    sendPlaylist: async (playlistId) => {
        try {
            return await playlistModel.findOne({_id: playlistId});
        } catch (err) {
            return err
        }
    },
    updateScore: async (tracks, id, points) => {
        tracks.forEach(track => {  if (track._id === id)  track.like += points });
        return sortTracksByScore(tracks)
    },
    manageRoom: async(rooms, roomID, tracks) => {

        if (rooms) {
            rooms.forEach((room) => {
                if (room.id === roomID)
                return rooms
            })
            return {id:roomID, tracks:sortTracksByScore(tracks)}
        }
        else
            return null;
    },  
    isRoom: async (rooms, roomID) => {
        rooms.forEach((room) => {
            if (room.id === roomID)
                return true;
        });
        return false;
    }
};
