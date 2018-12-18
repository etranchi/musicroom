'use strict';

const playlistModel = require('../models/playlist');
const eventModel    = require('../models/event');

this.rooms = [];

if (!this.roomUsersIndex)
    this.roomUsersIndex = [];
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
    getEvent: async (eventId) => {
        try {
            let event = await eventModel.findOne({_id: eventId});
            if (event) {
                return event
            }
            return null
        } catch (err) {
            return err
        }
    },
    updateScore: (room, trackID, points, userID) => {
        room.tracks.forEach((track) => {
            if (track._id.toString() === trackID.toString()) {
                let i = track.userLike.indexOf(userID)
                let j = track.userUnLike.indexOf(userID)
                if ((points === 1 && i !== -1) || (points === -1 && j !== -1))
                    return (room)
                if (i != -1) track.userLike.splice(i, 1);
                if (j != -1) track.userUnLike.splice(j, 1);
                points > 0 ? track.userLike.push(userID) : track.userUnLike.push(userID)
                track.like += points
            } 
        })
        return room
    },
    updateRoom: (tmpRoom) => {
        let ret = null;
        this.rooms.forEach((room) => {
            if (room.id === tmpRoom.id) {
                room.tracks = this.sortTracksByScore(tmpRoom.tracks)
                room.users  = tmpRoom.users;
                ret = room;
            }
        })
        return ret
    },
    updateTrackStatus: async (eventID, fStatus, fTrackID, sStatus, sTrackID) => {
        try {
            let event = await eventModel.findOne( {_id: eventID});
            for (var i = 0; i < event.playlist.tracks.data.length; i++) {
                let id = event.playlist.tracks.data[i]._id.toString();
                if (id === fTrackID) event.playlist.tracks.data[i].status = fStatus
                if (id === sTrackID) event.playlist.tracks.data[i].status = sStatus
            }
            await eventModel.updateOne({_id: eventID}, event, {new: true})
            return (event.playlist.tracks.data)
        } catch (e) {
            throw e
        }
    },
        // let newTab = [];
        // if (trackID && room && status) {
        //     this.rooms.forEach((tmp) => {
        //         if (tmp.id === room.id) {
        //             newTab = tmp.tracks.map((elem) => {
        //                 if (elem._id.toString() === trackID.toString() && status === 1) {
        //                     elem.status = status
        //                 }
        //                 else if (elem._id.toString() === secondTrackID.toString() && status === 1) {
        //                     elem.status = 0
        //                 }
        //                 else if (elem._id.toString() === trackID.toString()) {
        //                     elem.status = status * -1
        //                 }
        //                 else if (elem._id.toString() === secondTrackID.toString()) {
        //                     elem.status = status
        //                 }
        //                 return elem
        //             })
        //             // return ;
        //         }
        //     })
        // }
        // console.log("New Tab : ", newTab.length)
        // return this.sortTracksByScore(newTab)
    updateStatus: async (eventId, trackID) => {
        try {
            return await eventModel.findOneAndUpdate({_id: eventId}, {'isPlaying': trackID}, {new: true})
        }catch (e) {
            return e
        }
    },
    manageRooms: (type, roomID, userID) => {
        let currentRoom = {};

        console.log(this.roomUsersIndex.length)
        if (type === 'join') {
            console.log("ManageRooms JOIN : ")
            if (!this.roomUsersIndex || this.roomUsersIndex.length === 0)
            {
                console.log("ManageRooms : no room found for this ID going to create one")
                currentRoom.id = roomID
                currentRoom.users = [userID]
                this.roomUsersIndex.push(currentRoom);
                return true
            } else {
                console.log('')
                for (var i = 0; i < this.roomUsersIndex.length; i++) {
                    let room = this.roomUsersIndex[i];
                    if (room.id === roomID)
                    {
                        console.log("ManageRooms : room find go update USERS ")
                        if (room.users.indexOf(userID) === -1) {
                            console.log("ManageRooms : users not find goign add this users")
                            room.users.push(userID)
                            return true
                        }
                        else
                        {
                            console.log("ManageRooms : users find return false ")
                            return false
                        }
                    }
                    console.log("ManageRooms : no room found for this ID going to create one")
                    currentRoom.id = roomID
                    currentRoom.users = [userID]
                    this.roomUsersIndex.push(currentRoom);
                    return true
                }
            }
        }
        else {
            for (var i = 0; i < this.roomUsersIndex.length; i++) {
                let room = this.roomUsersIndex[i];
                if (room.id === roomID)
                {
                    console.log("Leave room find")
                    let j = 0;
                    if ( (j = room.users.indexOf(userID)) != -1) {
                        console.log("Leave user find")
                        room.users.splice(j, 1)
                    }
                    else
                        return false
                }
            }
        }
    },
    createRoom: async (roomID, userID) => {
        try {
            let event = await eventModel.findOne(
                {_id: roomID,
                $or: [
                    {creator: userID},
                    {'members': {$in: userID}},
                    {'adminMembers': {$in: userID}},
                    {public: true}
                ]})
            if (!event)
                throw new Error('you cannot access to this event')
            let room = {
                id: roomID,
                event,
                tracks: event.playlist.tracks.data,
                users: [userID]
            };
            room.tracks = room.tracks.map((track) => {
                track = {...track._doc, like: 0, status: 0, userLike: [], userUnLike: []}
                return track
            })
            room.tracks[0].status = 1;
            this.rooms.push(room);
            return room
        } catch (e) {
            throw e
        }
    },
    joinRoom: (room, userID) => {
        if (room.users && (room.users.indexOf(userID) === -1)) {
            room.users.push(userID)
            return true
        }
        return false
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
        let ret = null
        if (this.rooms) {
            for (let elem of this.rooms) {
                if (elem.id === roomID) {
                    ret = elem
                    break
                }
            }
        }
        return ret;
    },
    saveNewEvent: async (newEvent) => {
        if (newEvent._id)
            return await eventModel.updateOne({_id: newEvent._id}, newEvent, {new: true})
    },
    updatePlayStatus: async (roomID, value) => {
        if (roomID)
            return await eventModel.updateOne({_id: roomID}, {is_play:value}, {new: true})
    },
    updateEventTracks : async (eventId, tracks) => {
        try {
            return await eventModel.findOneAndUpdate({_id: eventId}, {'playlist.tracks.data': tracks}, {new: true})
        }catch (e) {
            return e
        }
    }
};
