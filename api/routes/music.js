'use strict'

const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/:id', musicController.getMusicById);

router.post('/:id', musicController.postMusicVote);

module.exports = router;
