const sinon = require('sinon');
const chai = require('chai')
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const {mockProducts} = require('../models/mocks/db.mock');
const productsService = require('../../../src/services/products.service');
const connection = require('../../../src/models/connection');

describe('Testes de unidade da camada controller de products', function () {
  it('Verifica se faz a busca por todos os produtos corretamente', async function () {
    const res = {};
    const req = mockProducts;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getAllProducts')
      .resolves([[mockProducts]]);
    
    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);

    // expect(res.json).to.have.been.calledWith(mockProducts);
  });
  // it('Verifica se faz a busca por apenas um produto corretamente', async function () {
  //   const res = {};
  //   const req = 1;
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon
  //     .stub(productsService, 'getOneProduct')
  //     .resolves([[mockProducts]]);

  //   await productsController.getProductsById(req, res);

  //   expect(res.status).to.have.been.calledWith(200);
  // });
})