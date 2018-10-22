'use strict'

const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist');

router.get('/', playlistController.getPlaylists);

router.get('/:id', playlistController.getPlaylistById);

router.post('/', playlistController.postPlaylist);

router.put('/:id', playlistController.putPlaylistById);

router.delete('/:id', playlistController.deletePlaylistById);


module.exports = router;

