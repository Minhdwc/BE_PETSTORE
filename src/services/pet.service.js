const Pet = require("../models/pet.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pet = await Pet.create(data);
      resolve({
        status: "Success",
        data: pet,
        message: "Pet created successfully",
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
      const pets = await Pet.find(filter).skip(skip).limit(limit);
      const total = await Pet.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: pets,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pet = await Pet.findById(id);
      resolve({
        status: "Success",
        data: pet,
        message: "Pet found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pet = await Pet.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: pet,
        message: "Pet updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Pet.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Pet deleted successfully",
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