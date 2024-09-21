const express = require('express');
const { register , login } = require('../Controllers/authcontroller');

const router = express.Router();

// Register route
router.post('/register', register);
router.post('/login', login);

module.exports = router;
