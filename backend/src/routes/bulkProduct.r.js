const express = require('express');
const router = express.Router();
const { createBulkProducts } = require('../controllers/bulkProduct.controller');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.post('/bulk', authenticateToken, isAdmin, createBulkProducts);

module.exports = router;
