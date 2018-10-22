'use strict'

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getPlaylists);

router.get('/:id', controller.getPlaylistById);

router.post('/', controller.postPlaylist);

router.put('/:id', controller.putPlaylistById);

router.delete('/:id', controller.deletePlaylistById);


module.exports = router;

