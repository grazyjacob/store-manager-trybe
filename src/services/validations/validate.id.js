const productsModel = require('../../models/products.model');

const validateId = async (id) => {
  const error = await productsModel.findById(id);
  if (!error) return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};