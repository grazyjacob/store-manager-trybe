const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  console.log('products service arquivo');
  const resultGet = await productsModel.getAll();
  return { type: null, message: resultGet };
};

module.exports = {
  getAllProducts,
};