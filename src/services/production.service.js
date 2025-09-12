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
            const filter = {};
            if (page !== undefined && limit !== undefined) {
                const pageNum = Number(page) || 1;
                const limitNum = Number(limit) || 10;
                const skip = (pageNum - 1) * limitNum;

                const [products, total] = await Promise.all([
                    Product.find(filter).skip(skip).limit(limitNum),
                    Product.countDocuments(filter),
                ]);

                resolve({
                    total,
                    currentPage: pageNum,
                    totalPages: Math.ceil(total / limitNum),
                    data: products,
                });
            } else {
                const products = await Product.find(filter);
                resolve({
                    total: products.length,
                    currentPage: 1,
                    totalPages: 1,
                    data: products,
                });
            }
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

const searchByName = (keyword, limit = 10) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};
            const results = await Product.find(query).limit(Number(limit));
            resolve({
                total: results.length,
                data: results,
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById,
    searchByName,
};