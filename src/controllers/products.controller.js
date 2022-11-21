const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getOneProduct(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) return res.status(type).json(message);
  res.status(201).json({ id: message[0].insertId, name });
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.uptadeAProduct(name, id);
  if (type) return res.status(type).json({ message });
  res.status(200).json({ id, name });
};

const deleteProductForId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(type).json({ message });
  res.status(204).json({});
};

module.exports = {
  getProductsById,
  getProducts,
  postProduct,
  putProduct,
  deleteProductForId,
};