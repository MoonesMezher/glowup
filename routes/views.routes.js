const express = require('express');
const router = express.Router();

// controller
const views = require('../controllers/views.controller');

// middlewares
// const requireAuth = require("../middlewares/auth")

// routes
router.get('/', views.indexPage);

router.get('/home', views.homePage);

router.get('/login', views.loginPage);

router.get('/items', views.itemsPage);

router.get('/add', views.addPage);

router.get('/edit/:id', views.editPage);

module.exports = router;