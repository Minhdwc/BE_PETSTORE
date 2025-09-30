const Service = require("../models/service.model");

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const service = await Service.create(data);
      resolve({
        status: "Success",
        data: service,
        message: "Service created successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = (category, isActive, minPrice, maxPrice, page, limit, sortBy, sortOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {};

      if (category) filter.category = category;
      if (isActive !== undefined) filter.isActive = isActive === 'true';
      if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice && maxPrice === undefined) {
        filter.price = { $gte: minPrice };
      } else if (maxPrice && minPrice === undefined) {
        filter.price = { $lte: maxPrice };
      }

      let serviceFilter = Service.find(filter);

      const sortOptions = {};
      if (sortBy) {
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
      } else {
        sortOptions.createdAt = -1;
      }
      serviceFilter = serviceFilter.sort(sortOptions);

      let total = await Service.countDocuments(filter);
      if (page && limit) {
        const skip = (page - 1) * limit;
        serviceFilter = serviceFilter.skip(skip).limit(limit);
      }

      const services = await serviceFilter;

      resolve({
        total,
        currentPage: page || 1,
        totalPages: limit ? Math.ceil(total / limit) : 1,
        data: services,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findById(id);
      if (!service) {
        return reject({
          status: "Error",
          message: "Service not found",
        });
      }
      resolve({
        status: "Success",
        data: service,
        message: "Service found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findByIdAndUpdate(id, data, { new: true });
      if (!service) {
        return reject({
          status: "Error",
          message: "Service not found",
        });
      }
      resolve({
        status: "Success",
        data: service,
        message: "Service updated successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return reject({
          status: "Error",
          message: "Service not found",
        });
      }
      resolve({
        status: "Success",
        message: "Service deleted successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const searchByName = (keyword, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = keyword ? { 
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } }
        ]
      } : {};
      const results = await Service.find(query).limit(Number(limit));
      resolve({
        total: results.length,
        data: results,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getByCategory = (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      const services = await Service.find({ 
        category: category,
        isActive: true 
      }).sort({ createdAt: -1 });
      
      resolve({
        status: "Success",
        data: services,
        message: `Services in ${category} category found successfully`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const toggleActive = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const service = await Service.findById(id);
      if (!service) {
        return reject({
          status: "Error",
          message: "Service not found",
        });
      }
      
      service.isActive = !service.isActive;
      await service.save();
      
      resolve({
        status: "Success",
        data: service,
        message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getActiveServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
      resolve({
        status: "Success",
        data: services,
        message: "Active services found successfully",
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
  getByCategory,
  toggleActive,
  getActiveServices,
};
