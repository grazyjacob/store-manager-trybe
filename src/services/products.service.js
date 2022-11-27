const productsModel = require('../models/products.model');

const { validateId } = require('./validations/validate.id');

const getAllProducts = async () => {
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

const uptadeAProduct = async (name, id) => {
  const validationId = await validateId(id);
  if (validationId.type) return { type: 404, message: 'Product not found' };
  const result = await productsModel.editProduct(name, id);
  return { type: null, message: result }; 
};

const deleteProduct = async (id) => {
  const validationId = await validateId(id);
  if (validationId.type) return { type: 404, message: 'Product not found' };
  const result = await productsModel.deleteProduct(id);
  return { type: null, message: result };
};

const getSearchProducts = async (q) => {
  const result = await productsModel.searchProducts(q);
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  uptadeAProduct,
  deleteProduct,
  getSearchProducts,
};