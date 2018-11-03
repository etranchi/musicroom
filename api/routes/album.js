'use strict'

const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album');

router.get('/:id', albumController.getTracksByAlbum);

module.exports = router;