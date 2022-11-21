const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const mockProducts = require('../models/mocks/db.mock');
const productsService = require('../../../src/services/products.service');
const validationId = require('../../../src/services/validations/validate.id')

newProduct = [{ id: 1, name: 'Machado do Thor Stormbreaker' }]

describe('Testes de unidade da camada service de products', function () {
  afterEach(sinon.restore);
  it('Verifica se retorna a lista completa de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(mockProducts);

    const result = await productsService.getAllProducts();
    expect(result.message).to.deep.equal(mockProducts);
  });
  it('Valida a busca pelo produto com o id incorreto', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const params = { id: 20 };
    const error = await productsService.getOneProduct(params)

    expect(error.type).to.equal('ID_NOT_FOUND');
    expect(error.message).to.equal('Product not found');
  });
  it('Valida a busca pelo produto com o id correto', async function () {
    sinon.stub(productsModel, 'findById').resolves(newProduct);

    const params = { id: 1 };
    const error = await productsService.getOneProduct(params.id)

    expect(error.type).to.equal(null);
    expect(error.message).to.equal(newProduct);
  });
});