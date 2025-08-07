const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const create = (data) => {
  return new Promise(async(resolve, reject) => {
    try {
      const passHash = await bcrypt.hash(data.password, 10);
      const newData = {...data, password: passHash}
      const user =await User.create(newData)
        resolve({
          status: "Success",
          data: user,
          message: "User created successfully",
        });
    } catch (e) {
      reject(e);
    }
  });
};
const getAll = (page, limit) => {
  return new Promise(async(resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      const filter ={};
      const users = await User.find(filter).skip(skip).limit(limit)
      const total = await User.countDocuments(filter)
        resolve({
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      const user = await User.findById(id);
      resolve({
        status: "Success",
        data: user,
        message: "User found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async(resolve, reject) => {
    try {
      if(data.password){
        data.password = await bcrypt.hash(data.password, 10)
      }
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: user,
        message: "User updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      User.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "User deleted successfully",
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
