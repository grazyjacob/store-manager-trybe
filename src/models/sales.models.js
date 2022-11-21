const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const createNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (default)',
  );
  return insertId;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return camelize(result);
};

const insert = async (newSaleId, sale) => {
  const columns = Object.keys(snakeize(sale))
    .map((key) => `${key}`)
    .join(', ');
  
  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns})
    VALUE (?, ${placeholders})`,
    [newSaleId, ...Object.values(sale)],
  );
  return insertId;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(result);
};

module.exports = {
  createNewSale,
  getAllSales,
  insert,
  findById,
};