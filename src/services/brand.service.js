const Brand = require('../models/brand.model');

const create = (data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const brand = new Brand(data);
            brand.save();
            resolve({
                status: "Success",
                data: brand,
                message: "Brand created successfully"
            })
        }catch(e){
            reject(e);
        }
    })
}

const getAll = (page, limit)=>{
    return new Promise((resolve, reject)=>{
        try{
            const skip = (page - 1) *  limit;
            Promise.all([
                Brand,find().skip(skip).limit(limit),
                Brand.countDocuments()
            ])
            .then(([brands, total])=>{
                resolve({
                    status: "Success",
                    data: brands,
                    pagination:{
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit)
                    },
                    message: `Get all brands successfully, page: ${page}, limit: ${limit}`
                })
            })
        }catch(e){
            reject(e);
        }
    })
}

const getById = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
            const brand = Brand.findById(id);
            resolve({
                status: "Success",
                data: brand,
                message: "Brand found successfully"
            })
        }catch(e){
            reject(e);
        }
    })
}

const update = (id, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const brand = Brand.findOneAndUpdate(id, data,{ new: true });
            brand.save();
            resolve({
                status: "Success",
                data: brand,
                message: "Brand updated successfully"
            })
        }
        catch(e){
            reject(e);
        }
    })
}

const deleteById = (id)=>{
    return new Promise((resolve, reject)=>{
        try{
            Brand.findByIdAndDelete(id)
            resolve({
                status: "Success",
                message: "Brand deleted successfully"
            });
        }catch(e){
            reject(e);
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