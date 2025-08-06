const joi = require("joi")
const categoryService = require("../services/category.service")

const Schema = joi.object({
    name: joi.string().required(),
    description: joi.string()
})

const create = (req, res)=>{
    try{
        const data = req.body;
        const {error, values} = Schema.valid(data);
        if(error){
            return res.status(400).json({message: error.message})
        }
        const response = categoryService.create(values);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAll = (req, res)=>{
    try{
        const response = categoryService.getAll();
        return res.status(200).json({response})
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
        const response = categoryService.getById(id);
        return res.status(200).json({response})
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
        const response = categoryService.update(id, data);
        return res.status(200).json({response})
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
        const response = categoryService.deleteById(id)
        return res.status(200).json({response})
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