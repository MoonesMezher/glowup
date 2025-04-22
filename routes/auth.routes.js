const express = require('express');
const router = express.Router();

// controller
const auth = require('../controllers/auth.controller');

// routes
router.post("/login", auth.login)


module.exports = router;