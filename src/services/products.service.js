const productsModel = require('../models/products.model');

const { validateId } = require('./validations/validate.id');

const getAllProducts = async () => {
  // console.log('products service arquivo');
  const resultGet = await productsModel.getAll();
  return { type: null, message: resultGet };
};

const getOneProduct = async (id) => {
  const error = await validateId(id);
  if (error.type) return error;
  const result = await productsModel.findById(id);
  return { type: null, message: result };
};

const createProduct = async (name) => {
  const result = await productsModel.createNewProduct(name);
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
};