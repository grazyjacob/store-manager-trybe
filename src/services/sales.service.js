const camelize = require('camelize');
const connection = require('../models/connection');

const salesModel = require('../models/sales.models');

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const validateProductId = async (arraySales) => {
  const arrayIdNewSales = arraySales.map((sale) => sale.productId);
  const verifyUndefined = arrayIdNewSales.filter((id) => !id);
  if (verifyUndefined.length === 1) {
    return { type: 400, message: '"productId" is required' };
  }
  const arrayVerifyId = arrayIdNewSales.map((id) => findById(id));
  const promiseAll = await Promise.all(arrayVerifyId);
  const arrayId = promiseAll.map((sale) => !sale);
  if (arrayId.includes(true)) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: 'OK' };
};

const validateQuantity = async (arraySales) => {
  const validateQuantityIs = await arraySales.map((sale) => Number(sale.quantity) <= 0);
  if (validateQuantityIs.includes(true)) {
    return { type: 422, message: '"quantity" must be greater than or equal to 1' }; // linha n coberta
  }
  const quantityIsRequired = arraySales.map((sale) => sale.quantity);
  if (quantityIsRequired.includes(undefined)) {
    return { type: 400, message: '"quantity" is required' }; // linha n coberta
  }
  return { message: 'OK' };
};

const createSale = async (arraySales) => {
  const validateId = await validateProductId(arraySales);
  const validateQuantityProducts = await validateQuantity(arraySales);
  
  if (validateId.type) {
    return { type: validateId.type, message: validateId.message };
  }
  if (validateQuantityProducts.type) { // daqui
    return { type: validateQuantityProducts.type, message: validateQuantityProducts.message };
  }
  const newSaleId = await salesModel.createNewSale();
  const response = arraySales
    .map(async (sale) => salesModel.insert(newSaleId, sale));
  await Promise.all(response);
  return { type: null, message: { id: newSaleId, itemsSold: arraySales } }; // até aqui n coberto
};

const getSales = async () => {
  const result = await salesModel.getAllSales();
  if (!result) return { type: 'ID_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

const getOneSale = async (id) => {
  const result = await salesModel.findSaleById(id);
    if (result.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: result };
};

const deleteSale = async (id) => { // func n coberta
  const result = await salesModel.findSaleById(id);
  if (result.length === 0) return { type: 404, message: 'Sale not found' };
  const resultDelete = await salesModel.deleteSaleById(id);
  return { type: null, message: resultDelete };
};

const validateSale = async (id) => { // func n coberta
  const result = await salesModel.findSaleById(id);
  if (result.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: 'Ok' };
};

const updateSale = async (id, arrayUpdateSales) => { // func n coberta
  const validateSaleId = await validateSale(id);
  if (validateSaleId.type) return { type: validateSaleId.type, message: validateSaleId.message };
  const validateId = await validateProductId(arrayUpdateSales);
  if (validateId.type) {
    return { type: validateId.type, message: validateId.message };
  }
  const validateQuantityProducts = await validateQuantity(arrayUpdateSales);
  if (validateQuantityProducts.type) {
    return { type: validateQuantityProducts.type, message: validateQuantityProducts.message };
  }
  const response = arrayUpdateSales
    .map(async (sale) => salesModel.updateASale(id, sale));
  await Promise.all(response);
  return { type: null, message: { saleId: id, itemsUpdated: arrayUpdateSales } };
};

module.exports = {
  createSale,
  getSales,
  getOneSale,
  deleteSale,
  updateSale,
};