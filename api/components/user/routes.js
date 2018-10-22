'use strict'

const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/', controller.getUsers);

// router.get('/:id', controller.getUserById);

router.post('/', controller.postUser);

// router.post('/register', controller.registerUser);

// router.put('/:id', controller.putUserById);

// router.delete('/:id', controller.deleteUserById);

module.exports = router;
