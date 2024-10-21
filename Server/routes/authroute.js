const express = require('express');
const { register, login,requestPasswordReset } = require('../Controllers/authcontroller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
