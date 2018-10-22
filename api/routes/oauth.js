'use strict'
const express = require('express');
const router = express.Router();
const deezer = require('../routes/deezer');


router.use('/deezer', deezer);

module.exports = router;
