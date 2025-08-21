const joi = require("joi")
const notificationService = require("../services/notification.service")

const Schema = joi.object({
    userId: joi.string().required(),
    message: joi.string().required(),
    type: joi.string().required(),
    isRead: joi.boolean().default("false")
})

const create = (req, res)=>{
    try{
        const data = req.body;
        const {error, values} = Schema.valid(data);
        if(error){
            return res.status(400).json({message: error.message})
        }
        const response = notificationService.create(values);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAll = (req, res)=>{
    try{
        const { page, limit } = req.query
        const response = notificationService.getAll(page, limit);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getById = (req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Invalid"})
        }
        const response = notificationService.getById(id);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const update = (req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        if(!id){
            return res.status(400).json({message: "Invalid Id"})
        }
        const response = notificationService.update(id, data);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteById = (req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Invalid Id"})
        }
        const response = notificationService.deleteById(id)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
}