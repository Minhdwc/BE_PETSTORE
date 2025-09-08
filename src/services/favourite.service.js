const Favourite = require("../models/favoutire.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const favoutire = await Favourite.create(data);
      resolve({
        status: "Success",
        data: favoutire,
        message: "Favourite created successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (userId, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      const filter = {};
      if (userId) filter.userId = userId;
      const favoutires = await Favourite.find(filter).skip(skip).limit(limit);
      const total = await Favourite.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: favoutires,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const favoutire = await Favourite.findById(id);
      resolve({
        status: "Success",
        data: favoutire,
        message: "Favourite found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const favoutire = await Favourite.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: favoutire,
        message: "Favourite updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Favourite.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Favourite deleted successfully",
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