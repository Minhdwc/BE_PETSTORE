const Notification = require('../models/notification.model');

const create = (data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const notification = new Notification(data);
            notification.save();
            resolve({
                status: "Success",
                data: notification,
                message: "Notification created successfully"
            });
        }catch(e){
            reject(e);
        }
    });
}

const getAll = (page, limit)=>{
    return new Promise((resolve, reject)=>{
        try{
            const skip = (page - 1) * limit;
            Promise.all([
                Notification.find().skip(skip).limit(limit),
                Notification.countDocuments()
            ]).then(([notifications, total])=>{
                resolve({
                    status: "Success",
                    data: notifications,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit)
                    },
                    message: `Get all notifications successfully, page: ${page}, limit: ${limit}`
                });
            });
        }catch(e){
            reject(e);
        }
    });
}

const getById = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
            const notification = Notification.findById(id);
            if(!notification){
                reject({status: "Error", message: "Notification not found"});
            }
            resolve({
                status: "Success",
                data: notification,
                message: "Notification found successfully"
            });
        }catch(e){
            reject(e);
        }
    });
}

const update = (id, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const notification = Notification.findByIdAndUpdate(id, data, { new: true })
            notification.save();
            resolve({
                status: "Success",
                data: notification,
                message: "Notification updated successfully"
            });
        }catch(e){
            reject(e);
        }
    })
}

const deleteById = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
            Notification.findByIdAndDelete(id);
            if(!notification){
                reject({status: "Error", message: "Notification not found"});
            }
            resolve({
                status: "Success",
                message: "Notification deleted successfully"
            });
        }catch(e){
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
};