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
    `SELECT SP.product_id, SP.quantity,SP.sale_id, S.date
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id`,
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

const findSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT SP.product_id, SP.quantity, S.date
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id
    WHERE SP.sale_id = ?`,
    [id],
  );
  return camelize(result);
};

module.exports = {
  createNewSale,
  getAllSales,
  findSaleById,
  insert,
  findById,
};