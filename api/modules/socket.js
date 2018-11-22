'use strict';

const playlistModel = require('../models/playlist');


module.exports = {
    sendPlaylist: async (playlistId) => {
        try {
            return await playlistModel.findOne({_id: playlistId});
        } catch (err) {
            return err
        }
    },
    sortTracksByScore: async (tracks) => {
       tracks.sort((a, b) => { return a.like < b.like ? 1 : -1 })
       return tracks
    },
    updateScore: async(tracks, id, points) => {
        tracks.forEach(track => {  if (track._id === id)  track.like += points });
        return tracks
	}
};
