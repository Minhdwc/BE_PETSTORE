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

const getAll = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      const filter = {};
      const notifications = await Notification.find(filter).skip(skip).limit(limit);
      const total = await Notification.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
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