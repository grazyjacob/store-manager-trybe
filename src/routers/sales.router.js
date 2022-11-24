const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/sales', salesController.postSale);
router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSaleById);
router.delete('/sales/:id', salesController.deleteSale);
router.put('/sales/:id', salesController.putSales);

module.exports = router;