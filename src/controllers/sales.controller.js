const salesService = require('../services/sales.service');

const postSale = async (req, res) => {
  const arraySales = req.body;
  const { type, message } = await salesService.createSale(arraySales);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();
  if (type) return res.status(type).json({ type, message });
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getOneSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

// deleteSale nao esta coberta 24-27
const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json({});
};

// putSales não está coberta 31-35
const putSales = async (req, res) => {
  const arrayUpdateSales = req.body;
  const { id } = req.params;
  const { type, message } = await salesService.updateSale(id, arrayUpdateSales);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  postSale,
  putSales,
  getSales,
  getSaleById,
  deleteSale,
};