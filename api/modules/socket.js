'use strict';

const playlistModel = require('../models/playlist');

this.rooms = [];

module.exports = {
    sendPlaylist: async (playlistId) => {
        try {
            return await playlistModel.findOne({_id: playlistId});
        } catch (err) {
            return err
        }
    },
    updateScore: async (room, trackID, points) => {
        room.tracks.forEach(track => {  if (track.id === trackID)  track.like += points });
        return this.sortTracksByScore(room.tracks)
    },
    createRoom: async(roomID, tracks) => {
        let room = {
            id: roomID,
            tracks: this.sortTracksByScore(tracks)
        };
        this.rooms.push(room)
        return room
    },
    getRoom: async (roomID) => {
        if (this.rooms) {
            this.rooms.forEach((room) => {
                if (room.id === roomID)
                    return room
            });
        }
        return null;
    },
    sortTracksByScore: async(tracks) => {
        tracks.sort((a, b) => { return a.like < b.like ? 1 : -1 })
        return tracks
    }
};
