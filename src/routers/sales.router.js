const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/sales', salesController.postSale);
router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSaleById);

module.exports = router;