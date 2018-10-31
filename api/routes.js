const express = require('express');
const router = express.Router();
const oauth = require('./routes/oauth');
const user = require('./routes/user');
const events = require('./routes/event');
const track = require('./routes/track');
const playlist = require('./routes/playlist');
const search = require('./routes/search');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.use('/oauth', oauth);

router.use('/user', user);

router.use('/event', events);

router.use('/track', track);

router.use('/playlist', playlist);

router.use('/search', search);

module.exports = router;
