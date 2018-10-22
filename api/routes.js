const express = require('express');
const router = express.Router();
const oauth = require('./components/oauth/routes.js');
const user = require('./components/user/routes.js');
const events = require('./components/event/routes.js');
const music = require('./components/music/routes.js');
const playlist = require('./components/playlist/routes.js');

router.use('/oauth', oauth);

router.use('/user', user);

router.use('/event', events);

router.use('/music', music);

router.use('/playlist', playlist);

module.exports = router;
