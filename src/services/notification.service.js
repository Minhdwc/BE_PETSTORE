const Notification = require('../models/notification.model');

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notification = await Notification.create(data);
      resolve({
        status: "Success",
        data: notification,
        message: "Notification created successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (userId, page = 1, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        reject(new Error("User ID is required"));
        return;
      }
      
      const skip = ((page || 1) - 1) * (limit || 10);
      const filter = { userId: userId };
      const notifications = await Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit || 10);
      const total = await Notification.countDocuments(filter);
      
      resolve({
        total,
        currentPage: page || 1,
        totalPages: Math.ceil(total / (limit || 10)),
        data: notifications,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notification = await Notification.findById(id);
      resolve({
        status: "Success",
        data: notification,
        message: "Notification found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notification = await Notification.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: notification,
        message: "Notification updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Notification.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Notification deleted successfully",
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