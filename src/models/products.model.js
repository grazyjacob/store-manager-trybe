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
  console.log(result);
  return camelize(result);
};

const createNewProduct = async (name) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return camelize(result);
};

const editName = async (name, id) => {
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

module.exports = {
  getAll,
  findById,
  createNewProduct,
  editName,
  deleteProduct,
};