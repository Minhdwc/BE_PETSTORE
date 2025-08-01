const Cart = require("../models/cart.model");

const create = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const cart = new Cart(data);
      cart.save();
      resolve({
        status: "Success",
        data: cart,
        message: "Cart created successfully",
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
        Cart.find().skip(skip).limit(limit),
        Cart.countDocuments(),
      ]).then(([carts, total]) => {
        resolve({
          status: "Success",
          data: carts,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
          message: `Get all carts successfully, page: ${page}, limit: ${limit}`,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getByIdUser = (idUser) => {
  return new Promise((resolve, reject) => {
    try {
      const cart = Cart.find({ userId: idUser });
      resolve({
        status: "Success",
        data: cart,
        message: "Cart found successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const cart = Cart.findByIdAndUpdate(id, data,{ new: true })
            cart.save();
            resolve({
                status: "Success",
                data: cart,
                message: "Cart updated successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteById = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
            Cart.findByIdAndDelete(id);
            resolve({
                status: "Success",
                message: "Cart deleted successfully"
            })
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    create,
    getAll,
    getByIdUser,
    update,
    deleteById
}