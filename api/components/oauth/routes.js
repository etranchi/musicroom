'use strict'
const express = require('express');
const router = express.Router();
const deezer = require('./deezer/routes');


router.use('/deezer', deezer);

module.exports = router;
