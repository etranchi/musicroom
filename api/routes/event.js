'use strict'

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const multer  = require('multer')
const upload = multer({ dest: "./public/eventPicture/"})
const passport = require('passport');
const middlewares = require('../modules/middlewares');

router.get('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    eventController.getEvents);

router.get('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    eventController.getEventById);

router.put('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    eventController.putEventById);

router.delete('/:id',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    eventController.deleteEventById);

router.post('/',
    passport.authenticate('bearer'),
    middlewares.isConfirmed,
    upload.single('file'),
    eventController.postEvent);

module.exports = router;
