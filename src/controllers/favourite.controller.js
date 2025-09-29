const joi = require("joi")
const favouriteService = require("../services/favourite.service")

const Schema = joi.object({
    items: joi.array().items(
        joi.object({
            itemId: joi.string().required(),
            itemType: joi.string().valid("Pet", "Product").required(),
            quantity: joi.number().default(1),
            price: joi.number().default(0)
        })
    )
})

const create = async (req, res)=>{
    try{
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({message: "Unauthorized"})
        }
        const data = req.body || {};
        const {error, value} = Schema.validate(data);
        if(error){
            return res.status(400).json({message: error.message})
        }
        const response = await favouriteService.create({ userId, items: value.items || [] });
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAll = async (req, res)=>{
    try{
        const userId = req.user?.id; // Get userId from authenticated user
        const { page = 1, limit = 10 } = req.query
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        const response = await favouriteService.getAll( userId, pageNum, limitNum);
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
        const response = favouriteService.getById(id);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const update = async (req, res)=>{
    try{
        const userId = req.user?.id;
        const { items } = req.body;
        const response = await favouriteService.update(userId, items);
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
        const response = favouriteService.deleteById(id)
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