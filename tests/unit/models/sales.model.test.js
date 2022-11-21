const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.models');
const mockSales = require('./mocks/db.mock.sales');

const connection = require('../../../src/models/connection');
const newSale = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];

const newSaleId = 3


describe('Testes de unidade da camada model de sales', function () {
  afterEach(sinon.restore);

  it('Verifica se busca todos as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([mockSales]);
    const result = await salesModel.getAllSales();
    expect(result).to.be.deep.equal(mockSales);
  });

  it('Verifica se busca uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[mockSales[0]]]);
    const result = await salesModel.findSaleById(1);
    expect(result).to.be.deep.equal([mockSales[0]])
  });
  //Pesquisar como desenvolver esse teste abaixo
  // it('Verifica a criação de uma nova venda', async function () {
  //   sinon.stub(connection, 'execute').resolves(newSale)
  //   const result = await salesModel.createNewSale();
  //   expect(result).to.be.deep.equal();
  // });
  // it('Verifica a inserção de novas vendas no banco de dados', async function () {
  //   sinon.stub(connection, 'execute').resolves(newSale);
  //   const result = await salesModel.insert(newSale, 3);
  //   expect(result).to.be.deep.equal(newSale)
  // })
  it('Verifica se busca um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[mockSales[0]]]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(mockSales[0])
  })
  it('Cadastrando uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3}]);
    const result = await salesModel.insert(newSaleId, newSale,);
    expect(result).to.equal(3)
  });
});
