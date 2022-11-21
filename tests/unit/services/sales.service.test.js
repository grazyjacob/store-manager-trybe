const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.models');
const connection = require('../../../src/models/connection');
const mockSales = require('../models/mocks/db.mock.sales');
const salesService = require('../../../src/services/sales.service');

describe('Testes de unidade da camada service de sales', function () {
  afterEach(sinon.restore);
  it('Verifica se retorna a lista completa de vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(mockSales);

    const result = await salesService.getSales();
    expect(result.message).to.deep.equal(mockSales);
  });
  it('Valida a busca pelo produto com o id incorreto', async function () {
    sinon.stub(connection, 'execute').resolves([[mockSales[0]]]);

    // const result = await validationId.validateId(5);
    const res = await productsService.getOneSale(5)
    expect(result.message).to.be.deep.equal('Product not found');
    expect(res.type).to.be.equal(404);
  });
});