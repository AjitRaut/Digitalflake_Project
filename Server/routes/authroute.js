// routes/user.js
const express = require('express');
const { register, login,requestPasswordReset } = require('../Controllers/authcontroller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', requestPasswordReset); // Add this line

module.exports = router;
