const Order = require('../models/order.model');

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.create(data);
      resolve({
        status: "Success",
        data: order,
        message: "Order created successfully",
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
      const orders = await Order.find(filter).skip(skip).limit(limit);
      const total = await Order.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: orders,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById(id);
      resolve({
        status: "Success",
        data: order,
        message: "Order found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: order,
        message: "Order updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Order.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Order deleted successfully",
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