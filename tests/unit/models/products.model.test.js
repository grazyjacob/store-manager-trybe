const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const mockProducts = require('./mocks/db.mock');

const connection = require('../../../src/models/connection');

const FIRST_ID = 1;
const FOUR_ID = 4;

describe('Testes de unidade da camada model de products', function () {
  afterEach(sinon.restore);

  it('Verifica se busca todos os products', async function () {
    sinon.stub(connection, 'execute').resolves([mockProducts]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(mockProducts);
  });

  it('Verifica se busca um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
    const result = await productsModel.findById(FIRST_ID);
    expect(result).to.be.deep.equal(mockProducts[0])
  })
  });