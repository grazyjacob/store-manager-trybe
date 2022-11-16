const camelize = require('camelize');
const connection = require('./connection');
// const snakeize = require('snakeize');

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
  console.log('cheguei no model');
  const result = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return camelize(result);
};

// const createNewProduct = async (name, _id) => {
//   console.log('cheguei no model');
//   const result = await connection.execute(
//     `INSERT INTO StoreManager.products (name) VALUES 
//     (${name})`,
//   );
//   return camelize(result);
// };

module.exports = {
  getAll,
  findById,
  createNewProduct,
};