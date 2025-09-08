const joi = require("joi")
const cartService = require("../services/cart.service")

const Schema = joi.object({
    userId: joi.string(),
    items: joi.array().items(
        joi.object({
            itemId: joi.string().required(),
            itemType: joi.string().valid("Pet", "Product"),
            quantity: joi.number(),
            price: joi.number().required()
        })
    ),
    totalQuantity: joi.number(),
    totalPrice: joi.number()
})

const create = async (req, res)=>{
    try{ 
        const data = req.body;
        const { error, value } = Schema.validate(data);
        if(error){
            return res.status(400).json({message: error.message})
        }

        const idUser = req.user?.id;
        if(!idUser){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const values = { ...value, userId: idUser };
        const response = await cartService.create(values);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getByID = async (req, res)=>{
    try{
        const {page, limit} = req.query;
        const userId = String(req.user.id);
        const response = await cartService.getAll(userId, page || 1, limit || 10);
        return res.status(200).json(response);
    }catch(err){
        console.error("Error getting cart:", err);
        return res.status(500).json({message: err.message});
    }
}

const update = async (req, res)=>{
    try{
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { items } = req.body || {};
        const response = await cartService.update(String(userId), items || []);
        return res.status(200).json(response)
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
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    // getAll,
    getByID,
    update,
    deleteById
}