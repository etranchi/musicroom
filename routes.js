const express = require('express');
const router = express.Router();
const oauth = require('./components/oauth/routes.js');

router.use('/oauth', oauth);

module.exports = router;
