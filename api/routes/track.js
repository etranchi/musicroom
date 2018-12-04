'use strict'

const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track');
const passport = require('passport');
const middlewares = require('../modules/middlewares');

router.get('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    trackController.getTracksByUser);

router.post('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    trackController.postTrack);

router.delete('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    trackController.deleteTrackById);

module.exports = router;
