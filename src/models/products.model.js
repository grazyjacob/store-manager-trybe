const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const createNewProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return camelize(insertId);
};

const editProduct = async (name, id) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?`,
    [name, id],
  );
  return camelize(result);
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.products
   WHERE id = ?`,
    [id],
  );
  return camelize(result);
};

const searchProducts = async (q) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
WHERE name LIKE '${q}%'`,
  );
  return camelize(result);
};

module.exports = {
  getAll,
  findById,
  createNewProduct,
  editProduct,
  deleteProduct,
  searchProducts,
};