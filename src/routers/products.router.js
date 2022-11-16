const express = require('express');
const productsController = require('../controllers/products.controller');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/products/:id', productsController.getProductsById);
router.get('/products', productsController.getProducts);
router.post('/products', validateName, productsController.postProduct);

module.exports = router;