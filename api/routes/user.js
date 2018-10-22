'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/', userController.getUsers);

// router.get('/:id', userController.getUserById);

router.post('/', userController.postUser);

// router.post('/register', userController.registerUser);

// router.put('/:id', userController.putUserById);

// router.delete('/:id', userController.deleteUserById);

module.exports = router;
