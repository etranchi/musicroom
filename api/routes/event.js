'use strict'

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');
const multer  = require('multer')
const upload = multer({ dest: "./public/eventPicture"})
  
router.get('/', eventController.getEvents);

router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.putEventById);

router.delete('/:id', eventController.deleteEventById);

router.post('/', upload.single('file'), eventController.postEvent);

module.exports = router;
