const express = require('express');
const router = express.Router();
const oauth = require('./routes/oauth');
const user = require('./routes/user');
const events = require('./routes/event');
const track = require('./routes/track');
const playlist = require('./routes/playlist');

router.use('/oauth', oauth);

router.use('/user', user);

router.use('/event', events);

router.use('/track', track);

router.use('/playlist', playlist);

module.exports = router;
