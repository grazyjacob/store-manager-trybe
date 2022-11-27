const express = require('express');
const productsController = require('../controllers/products.controller');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/products/search', productsController.searchProducts);
router.get('/products/:id', productsController.getProductsById);
router.get('/products', productsController.getProducts);
router.post('/products', validateName, productsController.postProduct);
router.put('/products/:id', validateName, productsController.putProduct);
router.delete('/products/:id', productsController.deleteProductForId);
module.exports = router;