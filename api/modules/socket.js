'use strict';

const playlistModel = require('../models/playlist');

class Socket {
	static async sendPlaylist(playlistId) {
        try {
            return await playlistModel.findOne({_id: playlistId});
        } catch (err) {
            return err
        }
	}
}
module.exports = Socket;
