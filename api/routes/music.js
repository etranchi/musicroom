'use strict'

const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music');

router.get('/', musicController.getMusics);

router.get('/:id', musicController.getMusicById);

router.post('/:id', musicController.postMusicVote);

router.delete('/:id', musicController.deleteMusicById);

module.exports = router;
