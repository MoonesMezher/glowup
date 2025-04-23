const express = require('express');
const router = express.Router();

// controller
const views = require('../controllers/views.controller');

// middlewares
const requireAuth = require("../middlewares/auth")
const notAdmin = require("../middlewares/notAdmin")

// routes
router.get('/', [requireAuth], views.indexPage);

router.get('/home', [notAdmin], views.homePage);

router.get('/login', [notAdmin],views.loginPage);

router.get('/items', [requireAuth],views.itemsPage);

router.get('/add', [requireAuth], views.addPage);

router.get('/edit/:id', [requireAuth], views.editPage);

module.exports = router;