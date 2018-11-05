'use strict'

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/', searchController.search);

router.get('/track', searchController.searchTrack);

router.get('/album', searchController.searchAlbum);

router.get('/playlist', searchController.searchPlaylist);

router.get('/artist', searchController.searchArtist);


//album/:id/tracks, 
//playlist/:id/tracks 
//search/artist/?q

module.exports = router;
