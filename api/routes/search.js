'use strict'

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/', searchController.search);

router.get('/track', searchController.searchTrack);

router.get('/album', searchController.searchAlbum);

router.get('/playlist', searchController.searchPlaylist);


module.exports = router;
