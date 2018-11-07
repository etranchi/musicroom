'use strict'

const express = require('express');
const router = express.Router();
// const strategies = require('../controllers/strategies')();
const passport = require('passport');
const middlewares = require('../modules/middlewares');
const playlistController = require('../controllers/playlist');


router.get('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.getPlaylistsByUser);

router.get('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.getPlaylistById);

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

router.delete('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.deletePlaylistById);

router.delete('/:id/track',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    playlistController.deleteTrackPlaylistById);

module.exports = router;

