'use strict'

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/:id', controller.getMusicById);

router.post('/:id', controller.postMusicVote);

module.exports = router;
