'use strict'

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');
const passport = require('passport');
const middlewares = require('../modules/middlewares');

router.get('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    searchController.search);

router.get('/track',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    searchController.searchTrack);

router.get('/album',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    searchController.searchAlbum);

router.get('/playlist',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    searchController.searchPlaylist);

router.get('/artist',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    searchController.searchArtist);


//album/:id/tracks, 
//playlist/:id/tracks 
//search/artist/?q

module.exports = router;
