const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const createNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES(default)',
  );
  return insertId;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return camelize(result);
};

const insert = async (sale) => {
  console.log('entrou no insert', sale);
  const columns = Object.keys(snakeize(sale))
    .map((key) => `${key}`)
    .join(', ');
  
  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');

  const [{ saleId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns})
    VALUE (${placeholders})`,
    [...Object.values(sale)],
  );
  console.log('saiu do insert');
  return saleId;
};

module.exports = {
  createNewSale,
  getAllSales,
  insert,
};