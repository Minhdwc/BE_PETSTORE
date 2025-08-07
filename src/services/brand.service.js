const Brand = require("../models/brand.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await Brand.create(data);
      resolve({
        status: "Success",
        data: brand,
        message: "Brand created successfully",
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
      const brands = await Brand.find(filter).skip(skip).limit(limit);
      const total = await Brand.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: brands,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await Brand.findById(id);
      resolve({
        status: "Success",
        data: brand,
        message: "Brand found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await Brand.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: brand,
        message: "Brand updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Brand.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Brand deleted successfully",
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
