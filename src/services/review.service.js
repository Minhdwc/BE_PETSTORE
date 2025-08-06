const Review = require("../models/review.model")

const create = (data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const review = new Review(data)
            review.save();
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
    return new Promise((resolve, reject) => {
        try {
            const skip = (page - 1) * limit;
            Promise.all([
                Review.find().skip(skip).limit(limit),
                Review.countDocuments()
            ]).then(([reviews, total]) => {
                resolve({
                    status: "Success",
                    data: reviews,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit)
                    },
                    message: `Get all reivews successfully, page: ${page}, limit: ${limit}`
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
            const review = Review.findById(id)
            resolve({
                status: "Success",
                data: review,
                message: "Review found successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

const update = (id, data)=>{
    return new Promise((resolve, reject)=>{
        try{
            const review = Review.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: "Success",
                data: review,
                message: "Review updated successfully"
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteById = (id) =>{
    return new Promise((resolve, reject)=>{
        try{
            Review.findByIdAndDelete(id)
            resolve({
                status: "Success",
                message: "Review deleted successfully"
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