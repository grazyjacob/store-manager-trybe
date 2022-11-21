const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.models');
const connection = require('../../../src/models/connection');
const mockSales = require('../models/mocks/db.mock.sales');
const salesService = require('../../../src/services/sales.service');
const res = require('express/lib/response');

const newSale =[ {
  "productId": 7,
  "quantity": 5,
  "saleId": 1,
}]

describe('Testes de unidade da camada service de sales', function () {
  afterEach(sinon.restore);
  it('Verifica se retorna a lista completa de vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(mockSales);

    const result = await salesService.getSales();
    expect(result.message).to.deep.equal(mockSales);
  });
  it('Valida a busca pela venda com o id incorreto', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves([]);

    const result = await salesService.getOneSale(4)
    expect(result.message).to.be.deep.equal('Sale not found');
    expect(result.type).to.be.equal(404);
  });
  it('Valida a busca pela venda com o id correto', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves(mockSales[0]);

    const result = await salesService.getOneSale(1)
    expect(result.message).to.be.deep.equal(mockSales[0]);
  });
  it('Valida se não é possível criar uma venda com um produto inesistente', async function () {
    sinon.stub(salesModel, 'insert').resolves(newSale)

    const result = await salesService.createSale(newSale)
    expect(result.message).to.be.deep.equal('Product not found')
  });
});