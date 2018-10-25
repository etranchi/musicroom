'use strict'

const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track');

router.get('/', trackController.getTracks);

router.get('/:id', trackController.getTrackById);

router.post('/:id', trackController.postTrackVote);

router.delete('/:id', trackController.deleteTrackById);

module.exports = router;
