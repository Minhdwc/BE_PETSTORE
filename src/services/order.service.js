const Order = require('../models/order.model');

const create = (data) => {
    return new Promise((resolve, reject) => {
        try {
        const order = new Order(data);
        order.save();
        resolve({
            status: "Success",
            data: order,
            message: "Order created successfully"
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
                Order.find().skip(skip).limit(limit),
                Order.countDocuments()
            ]).then(([orders, total]) => {
                resolve({
                    status: "Success",
                    data: orders,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit)
                    },
                    message: `Get all orders successfully, page: ${page}, limit: ${limit}`
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
            const order = Order.findById(id);
            resolve({
                status: "Success",
                data: order,
                message: "Order found successfully"
            });
        } catch (e) {
            reject(e);
        }
    });
}

const update = (id, data) => {
    return new Promise((resolve, reject) => {
        try {
            const order = Order.findByIdAndUpdate(id, data, { new: true });
            order.save();
            resolve({
                status: "Success",
                data: order,
                message: "Order updated successfully"
            });
        } catch (e) {
            reject(e);
        }
})
}