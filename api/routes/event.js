'use strict'

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');

router.get('/', eventController.getEvents);

router.get('/:id', eventController.getEventById);

router.post('/', eventController.postEvent);

router.put('/:id', eventController.putEventById);

router.delete('/:id', eventController.deleteEventById);

module.exports = router;
