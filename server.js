'use strict';

const express = require('express');

// Constants
const PORT = 4242;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send(503, 'Service unavailable ;)');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
