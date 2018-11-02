const express = require('express');
const router = express.Router();
const oauth = require('./routes/oauth');
const user = require('./routes/user');
const events = require('./routes/event');
const track = require('./routes/track');
const playlist = require('./routes/playlist');
const search = require('./routes/search');

router.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


router.use('/oauth', oauth);

router.use('/user', user);

router.use('/event', events);

router.use('/track', track);

router.use('/playlist', playlist);

router.use('/search', search);

module.exports = router;
