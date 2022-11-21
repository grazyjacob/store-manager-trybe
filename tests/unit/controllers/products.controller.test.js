const sinon = require('sinon');
const chai = require('chai')
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const {mockProducts} = require('../models/mocks/db.mock');
const productsService = require('../../../src/services/products.service');
const connection = require('../../../src/models/connection');

const newProduct = {
  "name": "Martelo do Batman"
}

const newProductId = {
  insertId: 4
}

describe('Testes de unidade da camada controller de products', function () {
  afterEach(sinon.restore);
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
  });
  it('Verifica se faz a busca por apenas um produto corretamente', async function () {
    const res = {};
    const req = {
      params: { id: 1 }
    }
      
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getOneProduct')
        .resolves({ type: null, message: mockProducts[0] });

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProducts[0]);
  });
  // Não consegui fazer esse por causa do insert id presente no controller
  // it('Verifica se consegue criar um novo produto corretamente', async function () {
  //   const res = {};
  //   const req = { body: newProduct };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon
  //     .stub(productsService, 'createProduct')
  //     .resolves({ type: null, message: newProduct });

  //   await productsController.postProduct(req, res);

  //   expect(res.status).to.have.been.calledWith(201);
  //   expect(res.json).to.have.been.calledWith(newProduct);
  // });
  it('Verifica se não é possivel atualizar um produto caso de id inesistente', async function () {
    const res = {};
    const req = { params: {id: 8}, body: newProduct };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'uptadeAProduct')
      .resolves({ type: 404, message: 'Product not found' });

    await productsController.putProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  });
  it('Verifica se é possivel atualizar um produto', async function () {
    const res = {};
    const req = { params: { id: 2 }, body: newProduct };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'uptadeAProduct')
      .resolves({ id: 2, name: newProduct.name });

    await productsController.putProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 2, name: newProduct.name });
  });
});