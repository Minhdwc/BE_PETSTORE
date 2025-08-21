const joi = require("joi");
const productionService = require("../services/production.service");

const Schema = joi.object({
  name: joi.string().required(),
  category: joi.string().required(),
  stock: joi.number(),
  price: joi.number().required(),
  image_url: joi.string(),
  brand: joi.string().required(),
  description: joi.string(),
});

const create = (req, res) => {
  try {
    const data = req.body;
    const { error, values } = Schema.valid(data);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const response = productionService.create(values);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAll = (req, res) => {
  try {
    const { page, limit } = req.query
    const response = productionService.getAll(page, limit);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getById = (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid" });
    }
    const response = productionService.getById(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const response = productionService.update(id, data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteById = (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const response = productionService.deleteById(id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
