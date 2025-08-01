const Pet = require("../models/pet.model");

const create = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const pet = new Pet(data);
      pet.save();
      resolve({
        message: "Success",
        data: pet,
        status: "Pet created successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (page, limit) => {
  return new Promise((resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      Promise.all([
        Pet.find().skip(skip).limit(limit),
        Pet.countDocuments(),
      ]).then(([pets, total]) => {
        resolve({
          status: "Success",
          data: pets,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
          message: `Get all pets successfully, page: ${page}, limit: ${limit}`,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const pet = Pet.findById(id);
      resolve({
        status: "Success",
        data: pet,
        message: "Pet found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
        const pet = Pet.findByIdAndUpdate(id, data, { new: true });
        pet.save();
        resolve({
            status: "Success",
            data: pet,
            message: "Pet updated successfully"
        });
        } catch (e) {
            reject(e);
        }
})
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Pet.findByIdAndDelete(id);
            resolve({
                status: "Success",
                message: "Pet deleted successfully"
            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
}