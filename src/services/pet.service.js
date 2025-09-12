const Pet = require("../models/pet.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pet = await Pet.create(data);
      resolve({
        status: "Success",
        data: pet,
        message: "Pet created successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (species, generic, gender, age, breed, maxPrice, minPrice, status, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {};

      if (species) filter.species = species;
      if (generic) filter.generic = generic;
      if (gender) filter.gender = gender;
      if (age) filter.age = age;
      if (breed) filter.breed = breed;
      if (status) filter.status = status;

      if (maxPrice && minPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice && maxPrice === undefined) {
        filter.price = { $gte: min };
      } else if (maxPrice && minPrice === undefined) {
        filter.price = { $lte: max };
      }

      let petFilter = Pet.find(filter);

      let total = await Pet.countDocuments(filter);
      if (page && limit) {
        const skip = (page - 1) * limit;
        petFilter = petFilter.skip(skip).limit(limit);
      }

      const pets = await petFilter;

      resolve({
        total,
        currentPage: page || 1,
        totalPages: limit ? Math.ceil(total / limit) : 1,
        data: pets,
      });
    } catch (e) {
      reject(e);
    }
  });
};


const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pet = await Pet.findById(id);
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
  return new Promise(async (resolve, reject) => {
    try {
      const pet = await Pet.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "Success",
        data: pet,
        message: "Pet updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Pet.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Pet deleted successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const searchByName = (keyword, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
      const results = await Pet.find(query).limit(Number(limit));
      resolve({
        total: results.length,
        data: results,
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
  searchByName,
};
