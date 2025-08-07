const Cart = require("../models/cart.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.create(data);
      resolve({
        status: "Success",
        data: cart,
        message: "Cart created successfully",
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
      const carts = await Cart.find(filter).skip(skip).limit(limit);
      const total = await Cart.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: carts,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.findById(id);
      resolve({
        status: "Success",
        data: cart,
        message: "Cart found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: cart,
        message: "Cart updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Cart.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Cart deleted successfully",
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