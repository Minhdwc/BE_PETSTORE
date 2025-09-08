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

const getAll = (userId, page = 1, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      const filter = userId ? { userId } : {};
      
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

const getByUserId = (userId, page = 1, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        return reject(new Error("UserId is required"));
      }
      
      const skip = (page - 1) * limit;
      const filter = { userId };
      
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

const update = (userId, items) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await Cart.findOne({ userId });
        cart.items = items || [];
        cart.totalQuantity = items ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
        cart.totalPrice = items ? items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
        await cart.save();
      
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
  getByUserId,
  getById,
  update,
  deleteById,
};