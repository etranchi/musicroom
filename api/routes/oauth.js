'use strict'
const express = require('express');
const router = express.Router();
const deezer = require('../routes/deezer');
const facebook = require('../routes/facebook');

router.use('/deezer', deezer);
router.use('/facebook', facebook);

module.exports = router;
