// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controller/userController');

// Register route
router.post('/register', usersController.registerUser);

// Login route
router.post('/login', usersController.loginUser);

// Logout route
router.get('/logout', usersController.logoutUser);

module.exports = router;