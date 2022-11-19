const camelize = require('camelize');
const connection = require('../models/connection');

const salesModel = require('../models/sales.models');
const productsModel = require('../models/products.model');

const saveSales = async (arraySales, saleId) => {
  if (arraySales && arraySales.length > 0) {
    return arraySales.map(async (value) => {
      await salesModel.insert({
        productId: value.productId,
        quantity: value.quantity,
        saleId,
      });
    });
  }

  return [];
};

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
    return { type: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  const quantityIsRequired = arraySales.map((sale) => sale.quantity);
  if (quantityIsRequired.includes(undefined)) {
    return { type: 400, message: '"quantity" is required' };
  }
  return { message: 'OK' };
};

const createSale = async (arraySales) => {
  const newSaleId = await salesModel.createNewSale();
  const validateId = await validateProductId(arraySales);
  const validateQuantityProducts = await validateQuantity(arraySales);
  if (validateId.type) {
    return { type: validateId.type, message: validateId.message };
  }
  if (validateQuantityProducts.type) {
    return { type: validateQuantityProducts.type, message: validateQuantityProducts.message };
  }
  // await Promise.all(saveSales(arraySales, newSaleId));
  // console.log('passou do promisse all');
  return { type: null, message: arraySales, id: newSaleId };
};

module.exports = {
  createSale,
};