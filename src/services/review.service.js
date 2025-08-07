const Review = require("../models/review.model")

const create = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const review = await Review.create(data)
            resolve({
                status:"Success",
                data: review,
                message: "Review created successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}
const getAll = (page, limit) => {
    return new Promise(async(resolve, reject) => {
        try {
            const skip = (page - 1) * limit;
            const filter = {};
            const reviews = await Review.find(filter).skip(skip).limit(limit);
            const total = await Review.countDocuments(filter);
            resolve({
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                data: reviews,
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getById =(id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const review = await Review.findById(id)
            resolve({
                status: "Success",
                data: review,
                message: "Review found successfully",
            });
        }catch(e){
            reject(e)
        }
    })
}

const update = (id, data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const review = await Review.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: "Success",
                data: review,
                message: "Review updated successfully",
            });
        }catch(e){
            reject(e)
        }
    })
}

const deleteById = (id) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            await Review.findByIdAndDelete(id)
            resolve({
                status: "Success",
                message: "Review deleted successfully",
            });
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
    deleteById,
};