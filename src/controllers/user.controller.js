const joi = require("joi");
const userService = require("../services/user.service");

const Schema = joi.object({
  name: joi.string().required(),
  email: joi().required(),
  password: joi().required(),
  role: joi().required(),
  image: joi.required(),
  address: joi()
    .array()
    .items({
      display_name: joi().string(),
      lat: joi().number(),
      lon: joi().number(),
      address: joi().string(),
    }),
});

const create = (req, res) => {
  try {
    const data = req.body;
    const { error, values } = Schema.valid(data);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const response = userService.create(values);
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAll = (req, res) => {
  try {
    const response = userService.getAll();
    return res.status(200).json({ response });
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
    const response = userService.getById(id);
    return res.status(200).json({ response });
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
    const response = userService.update(id, data);
    return res.status(200).json({ response });
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
    const response = userService.deleteById(id);
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
