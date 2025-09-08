const joi = require("joi")
const petService = require("../services/pet.service")

const Schema = joi.object({
    name: joi.string().required(),
    species: joi.string().required(),
    generic: joi.string().required(),
    age: joi.number().required(),
    breed: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    image_url: joi.string(),
    status: joi.string()
})

const create = async (req, res)=>{
    try{
        const data = req.body;
        const {error, values} = Schema.valid(data);
        if(error){
            return res.status(400).json({message: error.message})
        }
        const response = await petService.create(values);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAll = async (req, res)=>{
    try{
        const { species, generic, gender, age, breed, maxPrice, minPrice , status, page, limit  } = req.query
        const response = await petService.getAll(species, generic, gender, age, breed, maxPrice, minPrice , status, page, limit);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getById = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Invalid"})
        }
        const response = await petService.getById(id);
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
        const response = petService.update(id, data);
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
        const response = petService.deleteById(id)
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