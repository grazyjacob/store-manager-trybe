const productsModel = require('../models/products.model');

const productIdIsRequired = async (req, res, next) => {
  const [{ productId }] = req.body;
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const productIdFind = async (req, res, next) => {
  const [{ productId }] = req.body;
  const findId = await productsModel.findById(productId);
  if (!findId) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = {
  productIdIsRequired,
  productIdFind,
};