'use strict';

const playlistModel = require('../models/playlist');
const eventModel    = require('../models/event');

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
                room.users  = tmpRoom.users;
                ret = room;
            }
        })
        return ret
    },
    createRoom: (roomID, tracks, event, userID) => {
        let room = {
            id: roomID,
            tracks: tracks,
            data: event,
            users: [userID]
        };
        room.tracks.forEach((track) => {
            track.like = 0;
            track.userLike = [];
            track.userUnLike = [];
        })
        this.rooms.push(room);
        return room
    },
    joinRoom: (roomID, userID) => {
        if (this.rooms) {
            let ret;
            this.rooms.forEach((room) => {
                 if (room.id === roomID) {
                     ret = room
                     return;
                 }
             });
             if (ret.users && (ret.users.indexOf(userID) == -1)) {
                ret.users.push(userID)
                return true;
             }
         }
         return false;
    },
    deleteRoom: (roomID, userID) => {
        if (this.rooms && this.rooms.length > 0) {
            let ret = -1 ;
            for (let i = 0; i < this.rooms.length; i++) {
                if (this.rooms[i].id === roomID)
                    ret = i
                    break;
            }
            ret == -1  ? null : delete this.rooms.splice(ret, 1);
        }
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
            return await eventModel.updateOne({_id: newEvent._id}, newEvent, {new: true})
    },
    checkDistance: (event, userCoord) => {
        this.toRad = value => {
            return value * Math.PI / 180;
        }
        this.getDistance = (coordA, coordB) => {
            let R     = 6371; // km
            let dLat  = this.toRad(coordB.lat - coordA.lat);
            let dLon  = this.toRad(coordB.lng - coordA.lng);
            let lat1  = this.toRad(coordA.lng);
            let lat2  = this.toRad(coordB.lng);
    
            let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            let d = R * c;
            return d.toFixed(0);
        }
        let distance = this.getDistance(event.location.coord, userCoord);
        return distance < event.distance_max;
        
    }
};
