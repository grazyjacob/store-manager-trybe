const sinon = require('sinon');
const chai = require('chai')
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const mockProducts = require('../models/mocks/db.mock');
const productsService = require('../../../src/services/products.service');
const connection = require('../../../src/models/connection');

const updateProduct = {
  "name": "Martelo do Batman"
}
const newProduct = {
  "name": "Cinto de utilidades"
}

const searchMartelo = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
]

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
  it('Verifica se consegue criar um novo produto corretamente', async function () {
    const res = {};
    const req = { body: newProduct };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'createProduct')
      .resolves({ type: null, message: 4 });

    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: newProduct.name });
  });
  it('Verifica se não é possivel atualizar um produto caso de id inesistente', async function () {
    const res = {};
    const req = { params: {id: 8}, body: updateProduct };
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
    const req = { params: { id: 2 }, body: updateProduct };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'uptadeAProduct')
      .resolves({ id: 2, name: updateProduct.name });

    await productsController.putProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 2, name: updateProduct.name });
  });
  it('Verifica se é possível deletar um produto pelo id', async function () {
    const res = {};
    const req = { params: { id: 2 } }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'deleteProduct')
      .resolves({ type: null, message: '' })
    
    await productsController.deleteProductForId(req, res);

    expect(res.status).to.have.been.calledWith(204)
  });
  it('Verifica se é possivel encontrar um produto pelo name: "Martelo"', async function () {
    const res = {};
    const req = { query: { q: 'Martelo' } }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getSearchProducts')
      .resolves({ type: null, message: searchMartelo })
    
    await productsController.searchProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(searchMartelo);
  });
  it('Verifica  se é possivel trazer todos os produtos quando não for passado um name para a pesquisa', async function () {
    const res = {};
    const req = { query: { q: '' } }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'getSearchProducts')
      .resolves({message: mockProducts})
    
    await productsController.searchProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith();
  });
});