const Species = require("../models/species.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const species = await Species.create(data);
      resolve({
        status: "Success",
        data: species,
        message: "Species created successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      const filter = {};
      const speciesList = await Species.find(filter).skip(skip).limit(limit);
      const total = await Species.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: speciesList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const species = await Species.findById(id);
      resolve({
        status: "Success",
        data: species,
        message: "Species found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const species = await Species.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: species,
        message: "Species updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Species.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Species deleted successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
