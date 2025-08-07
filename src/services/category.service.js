const Category = require('../models/category.model')

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.create(data);
      resolve({
        status: "Success",
        data: category,
        message: "Category created successfully",
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
      const categories = await Category.find(filter).skip(skip).limit(limit);
      const total = await Category.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: categories,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findById(id);
      resolve({
        status: "Success",
        data: category,
        message: "Category found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: category,
        message: "Category updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Category.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Category deleted successfully",
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