'use strict'

const express = require('express');
const router = express.Router();
// const strategies = require('../controllers/strategies')();
const passport = require('passport');
const middlewares = require('../modules/middlewares');
const playlistController = require('../controllers/playlist');

// TO DELETE
router.get('/', playlistController.getPlaylists);

router.get('/me',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.getPlaylistsByUser);

// TO DELETE
router.get('/:id', playlistController.getPlaylistById);

router.get('/me/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.getPlaylistUserById);

router.post('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.postPlaylist);

router.put('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.putPlaylistById);

// TO DO
router.delete('/:id', playlistController.deletePlaylistById);

module.exports = router;

