'use strict';

const playlistModel = require('../models/playlist');

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
    updateScore: (room, trackID, points) => {
        console.log()
        room.tracks.forEach((track) => {
            if (track._id === trackID) 
            {
                console.log("Like ")
                track.like += points 
            }
        })

        room.tracks.forEach((track) => {
            console.log('update Score : ', track.like)

        })
        return room
    },
    updateRoom: (tmpRoom) => {
        let ret;
        this.rooms.forEach((room) => {
            if (room.id === tmpRoom.id) {
                room.tracks = this.sortTracksByScore(tmpRoom.tracks)
                ret = room;
            }
        })

        ret.tracks.forEach((track) => {
            console.log('update Room : ',track.like)

        })
        return ret
    },
    createRoom: (roomID, tracks) => {
        let room = {
            id: roomID,
            tracks: this.sortTracksByScore(tracks)
        };
        room.tracks.forEach((track) => {
            track.like = 0;
        })
        this.rooms.push(room)
        return room
    },
    getRoom: (roomID) => {
        if (this.rooms) {
           let ret;
           this.rooms.forEach((room) => {
                if (room.id === roomID) {
                    ret = room
                }
            });
            return ret
        }
        console.log("get room return null")
        return null;
    }
};
