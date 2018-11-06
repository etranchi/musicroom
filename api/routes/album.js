'use strict'

const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album');

router.get('/:id/tracks', albumController.getTracksByAlbum);

module.exports = router;