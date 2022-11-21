const salesService = require('../services/sales.service');

const postSale = async (req, res) => {
  const arraySales = req.body;
  const { type, message } = await salesService.createSale(arraySales);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getOneSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json({});
};

module.exports = {
  postSale,
  getSales,
  getSaleById,
  deleteSale,
};