'use strict'

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getEvents);

router.get('/:id', controller.getEventById);

router.post('/', controller.postEvent);

router.put('/:id', controller.putEventById);

router.delete('/:id', controller.deleteEventById);

module.exports = router;
