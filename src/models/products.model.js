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

module.exports = {
  getAll,
  findById,
};