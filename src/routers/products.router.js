const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/products/:id', productsController.getProductsById);
router.get('/products', productsController.getProducts);
router.post('/products', productsController.postProduct);

module.exports = router;