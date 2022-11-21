const sinon = require('sinon');
const chai = require('chai')
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/sales.controller');
const mockSales = require('../models/mocks/db.mock.sales');
const salesService = require('../../../src/services/sales.service');
const connection = require('../../../src/models/connection');

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

describe('Testes de unidade da camada controller de sales', function () {
  it('Verifica se faz a busca por todas as vendas corretamente', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSales')
      .resolves({ type: null, message: [] });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([]);
  });
  it('Verifica se faz a busca por uma venda através do id corretamente', async function () {
    const res = {};
    const req = { params: { id: 1 }
};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getOneSale')
      .resolves({ type: null, message: mockSales[0]});

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSales[0]);
  });
  it('Verifca se consegue criar uma nova venda corretamente', async function () {
    const res = {};
    const req = { body: newSale };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'createSale')
      .resolves({ type: null, message: newSale });

    await salesController.postSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSale);
  });
});

