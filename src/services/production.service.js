const Product = require('../models/production.model');

const create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.create(data);
            resolve({
                status: "Success",
                data: product,
                message: "Product created successfully",
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
            const products = await Product.find(filter).skip(skip).limit(limit);
            const total = await Product.countDocuments(filter);
            resolve({
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                data: products,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(id);
            resolve({
                status: "Success",
                data: product,
                message: "Product found successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const update = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: "Success",
                data: product,
                message: "Product updated successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.findByIdAndDelete(id);
            resolve({
                status: "Success",
                message: "Product deleted successfully",
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