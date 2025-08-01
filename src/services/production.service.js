const Product = require('../models/product.model');

const create = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const product = new Product(data);
            product.save();
            resolve({
                status: "Success",
                data: product,
                message: "Product created successfully"
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getAll = (page, limit) => {
    return new Promise((resolve, reject) => {
        try {
            const skip = (page - 1) * limit;
            Promise.all([
                Product.find().skip(skip).limit(limit),
                Product.countDocuments()
            ]).then(([products, total]) => {
                resolve({
                    status: "Success",
                    data: products,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit)
                    },
                    message: `Get all products successfully, page: ${page}, limit: ${limit}`
                });
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const product = Product.findById(id);
            resolve({
                status: "Success",
                data: product,
                message: "Product found successfully"
            });
        } catch (e) {
            reject(e);
        }
})
}

const update = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            const product = Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "Success",
                data: product,
                message: "Product updated successfully"
            });
        } catch (e) {
            reject(e);
        }
})
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Product.findByIdAndDelete(id).then(() => {
                resolve({
                    status: "Success",
                    message: "Product deleted successfully"
                });
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