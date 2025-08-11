const joi = require("joi")
const cartService = require("../services/cart.service")

const Schema = joi.object({
    userId: joi.string().required(),
    items: joi.array().items(
        joi.object({
            itemId: joi.string().required(),
            itemType: joi.string().valid("Pet", "Product"),
            quantity: joi.number().required(),
            price: joi.number().required()
        })
    ),
    totalQuantity: joi.number(),
    totalPrice: joi.number()
})

const create = (req, res)=>{
    try{ 
        const data = req.body;
        const { error, values } = Schema.validate(data);
        if(error){
            return status(400).json({message: error.message})
        }
        const response = cartService.create(values);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAll = (req, res)=>{
    try{
        const {page, limit} = req.query
        const response = cartService.getAll(page, limit);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getByID = (req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Invalid id"})
        }
        const response = cartService.getByIdUser(id);
        return res.status(200).jsoon({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const update = (req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        if(!id){
            return res.status(400).json({message: "Invalid Id"});
        }
        const response = cartService.update(data);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteById = (req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Invalid Id"});
        }
        const response = cartService.deleteById(id)
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    getAll,
    getByID,
    update,
    deleteById
}