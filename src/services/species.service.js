const Species = require("../models/species.model")

const create = (data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const review = new Species(data)
            review.save();
            resolve({
                status:"Success",
                data: review,
                message: "Species created successfully"
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
                Species.find().skip(skip).limit(limit),
                Species.countDocuments()
            ]).then(([species, total]) => {
                resolve({
                    status: "Success",
                    data: species,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit)
                    },
                    message: `Get all species successfully, page: ${page}, limit: ${limit}`
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
            const species = Species.findById(id)
            resolve({
                status: "Success",
                data: species,
                message: "Species found successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

const update = (id, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const species = Species.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: "Success",
                data: species,
                message: "Species updated successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteById = (id) =>{
    return new Promise((resolve, reject)=>{
        try{
            Species.findByIdAndDelete(id)
            resolve({
                status: "Success",
                message: "Species deleted successfully"
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