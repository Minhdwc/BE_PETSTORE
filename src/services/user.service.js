const User = require("../models/user.model")

const create = (data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const user = new User(data)
            user.save();
            resolve({
                status:"Success",
                data: user,
                message: "User created successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}
const getAll = (page, limit) => {
    return new Promise((resolve, reject) => {
        try {
            const skip = (page - 1) * limit;
            Promise.all([
                User.find().skip(skip).limit(limit),
                User.countDocuments()
            ]).then(([users, total]) => {
                resolve({
                    status: "Success",
                    data: users,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit)
                    },
                    message: `Get all users successfully, page: ${page}, limit: ${limit}`
                });
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getById =(id)=>{
    return new Promise((resolve, reject)=>{
        try{
            const user = User.findById(id)
            resolve({
                status: "Success",
                data: user,
                message: "User found successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

const update = (id, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const user = User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: "Success",
                data: user,
                message: "User updated successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteById = (id) =>{
    return new Promise((resolve, reject)=>{
        try{
            User.findByIdAndDelete(id)
            resolve({
                status: "Success",
                message: "User deleted successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
}