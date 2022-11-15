const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const getProducts = async (_req, res) => {
  console.log('afonso - productscontroller');
  const { type, message } = await productsService.getAllProducts();
  console.log(type);
  // console.log(`Afonso diz o tipo é: ${type}`);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

module.exports = {
  getProducts,
};