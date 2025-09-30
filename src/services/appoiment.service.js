const { Appointment } = require("../models/appointment.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const appointment = await Appointment.create(data);
      resolve({
        status: "Success",
        data: appointment,
        message: "Appointment created successfully",
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
      const appointments = await Appointment.find(filter).skip(skip).limit(limit);
      const total = await Appointment.countDocuments(filter);
      resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: appointments,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const appointment = await Appointment.findById(id);
      resolve({
        status: "Success",
        data: appointment,
        message: "Appointment found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: appointment,
        message: "Appointment updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Appointment.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Appointment deleted successfully",
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