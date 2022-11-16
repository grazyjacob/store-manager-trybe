const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const mockProducts = require('../models/mocks/db.mock');
const productsService = require('../../../src/services/products.service');
const validationId = require('../../../src/services/validations/validate.id')

describe('Testes de unidade da camada service de products', function () {
  afterEach(sinon.restore);
  it('Verifica se retorna a lista completa de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(mockProducts);

    const result = await productsService.getAllProducts();
    expect(result.message).to.deep.equal(mockProducts);
  });
  it('Valida a busca pelo produto com o id incorreto', async function () {
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);

    const result = await validationId.validateId(5);
    const res = await productsService.getOneProduct(5)
    expect(result.message).to.be.deep.equal('Product not found');
    expect(res.type).to.be.equal('ID_NOT_FOUND');
  });
});