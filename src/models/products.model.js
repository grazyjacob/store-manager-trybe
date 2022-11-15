const camelize = require('camelize');
const connection = require('./connection');
// const snakeize = require('snakeize');

const getAll = async () => {
  console.log('afonso no model');
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  console.log('afonso passou do connection');
  return camelize(result);
};

module.exports = {
  getAll,
};