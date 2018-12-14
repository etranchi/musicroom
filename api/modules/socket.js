'use strict';

const playlistModel = require('../models/playlist');
const eventModel    = require('../models/event');

this.rooms = [];

this.sortTracksByScore = (tracks) => {
    
    let tmpArray = tracks.reduce( (acc, elem) => {
        if (elem.status === 0) acc['toSort'].push(elem);
        else acc['played'].push(elem);
        return acc
    }, {toSort: [], played: []})
    tmpArray.toSort.sort((a, b) => { 
        return b.like - a.like;
    })
    tracks = tmpArray.played.concat(tmpArray.toSort)
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
            if (!track.status) track.status = 0
            if (track._id === trackID) {
                let i = 0;
                let j = 0;
                if ((i = track.userLike.indexOf(userID)) != -1) track.userLike.splice(i, 1);
                if ((j = track.userUnLike.indexOf(userID)) != -1) track.userUnLike.splice(j, 1);
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
            if (!track.status) track.status = 0;
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
    updateStatus: (room, status, trackID, secondTrackID) => {
        let newTab = [];
        if (trackID && room && status) {
            this.rooms.forEach((tmp) => {
                if (tmp.id === room.id) {
                    newTab = tmp.tracks.map((elem) => {
                        console.log(elem.short_title)
                        if (elem._id === trackID && status === 1) {
                            elem.status = status
                        }
                        else if (elem._id === secondTrackID && status === 1) {
                            elem.status = 0
                        }
                        else if (elem._id === trackID) {
                            console.log("FIND")
                            elem.status = status * -1
                        }
                        else if (elem._id === secondTrackID)
                            elem.status = status
                        return elem
                    })
                    // return ;
                }
            })
        }
        console.log("New Tab : ", newTab.length)
        return this.sortTracksByScore(newTab)
    },
    createRoom: (roomID, tracks, event, userID) => {
        let room = {
            id: roomID,
            tracks: tracks,
            data: event,
            users: [userID]
        };
        room.tracks.forEach((track) => {
            track.like      = 0;
            track.status    = 0;
            track.userLike  = [];
            track.userUnLike = [];
        })
        if (room.tracks[0])
            room.tracks[0].status = 1;
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
