'use strict';

const playlistModel = require('../models/playlist');
const eventModel = require('../models/event');

this.rooms = [];

this.sortTracksByScore = (tracks) => {
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
    updateScore: (room, trackID, points, userID) => {
        room.tracks.forEach((track) => {
            if (!track.like) track.like = 0;
            if (!track.userLike) track.userLike = [];
            if (!track.userUnLike) track.userUnLike = [];
            if (track._id === trackID)
            {
                console.log("Update score : find")
                points > 0 ? track.userLike.push(userID) : track.userUnLike.push(userID)
                track.like += points
            } 
        })
        return room
    },
    updateRoom: (tmpRoom) => {
        let ret;
        tmpRoom.tracks.forEach((track) => {
            if (!track.like) track.like = 0;
            if (!track.userLike) track.userLike = [];
            if (!track.userUnLike) track.userUnLike = [];
        })
        this.rooms.forEach((room) => {
            if (room.id === tmpRoom.id) {
                room.tracks = this.sortTracksByScore(tmpRoom.tracks)
                ret = room;
            }
        })

        return ret
    },
    createRoom: (roomID, tracks, event) => {
        let room = {
            id: roomID,
            tracks: this.sortTracksByScore(tracks),
            data: event,
        };
        room.tracks.forEach((track) => {
            track.like = 0;
            track.userLike = [];
            track.userUnLike = [];
        })
        this.rooms.push(room);
        return room
    },
    getRoom: (roomID) => {
        if (this.rooms) {
           let ret;
           this.rooms.forEach((room) => {
                if (room.id === roomID) {
                    ret = room
                    return ;
                }
            });
            return ret
        }
        return null;
    },
    saveNewEvent: async (newEvent) => {

        if (newEvent._id)
        {
            return await eventModel.updateOne({_id: newEvent._id}, newEvent, {new: true})
        }

    },
};
