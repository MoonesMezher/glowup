const express = require('express');
const router = express.Router();

// controller
const items = require('../controllers/items.controller');

// middlewares
const requireAuth = require('../middlewares/auth');

// routes
router.post('/', [requireAuth], items.addItem);

router.put("/update/:id", [requireAuth], items.updateItem)

router.delete("/delete/:id", [requireAuth], items.deleteItem)

router.get('/download', items.downloadItemsAsExcel);

module.exports = router;