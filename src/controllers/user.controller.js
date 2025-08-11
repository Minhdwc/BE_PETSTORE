const joi = require("joi");
const userService = require("../services/user.service");

const Schema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().required(),
  image: joi.string().required(),
  address: joi.array().items(
    joi.object({
      display_name: joi.string(),
      lat: joi.number(),
      lon: joi.number(),
      address: joi.string(),
    })
  ),
});

const create = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = Schema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const response = await userService.create(value);

    return res.status(200).json({ response });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const {page, limit} = req.query
    const response = await userService.getAll(page, limit);
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid" });
    }
    const response = await userService.getById(id);
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = async(req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const response = await userService.update(id, data);
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const response = await userService.deleteById(id);
    return res.status(200).json({ response });
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
