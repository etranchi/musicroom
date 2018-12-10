'use strict'

const express = require('express');
const router = express.Router();
const trackController = require('../controllers/track');
const passport = require('passport');
const middlewares = require('../modules/middlewares');

/**
 * @route GET /track
 * @group track - Operations about track
 * @security - Bearer: []
 * @returns {object} 200 - User loved tracks
 * @returns {Error} 400
 * @returns {Error}  default - Unexpected error
 */
router.get('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    trackController.getTracksByUser);

/**
 * @route POST /track
 * @group track - Operations about track
 * @security - Bearer: []
 * @param {string} id.query.required - track id
 * @returns {object} 201
 * @returns {Error} 400
 * @returns {Error}  default - Unexpected error
 */
router.post('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    trackController.postTrack);

/**
 * @route DELETE /track/:id
 * @group track - Operations about track
 * @security - Bearer: []
 * @returns {object} 204
 * @returns {Error} 400
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    trackController.deleteTrackById);

module.exports = router;
