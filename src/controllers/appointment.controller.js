const joi = require("joi")
const appointmentServices = require("../services/appoiment.service")

const Schema = joi.object({
    userId: joi.string().required(),
    categoryAppointment: joi.string().required(),
    time: joi.date().required(),
    status: joi.string().required()
})

const create = async(req, res)=>{
    try{
        const data = req.body;
        const {error, values} = Schema.validate(data)
        if(error){
            return res.status(400).json({message: error.message});
        }
        const response = await appointmentServices.create(values);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAll = async(req, res)=>{
    try{
        const { page, limit } = req.query
        const appointments = await appointmentServices.getAll(page, limit);
        return res.status(200).json({appointments})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getByID = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Invalid Id"})
        }
        const response = await appointmentServices.getById(id)
        if(!response){
            return res.status(404).json({message: "Appointment not found"})
        }
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const update = async(req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        if(!id){
            return res.status(400).json({message: "Invalid Id"})
        }
        const response = await appointmentServices.update(id, data);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteById = async(req, res)=>{
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message: "Invalid Id"})
        }
        const response = await appointmentServices.deleteById(id);
        return res.status(200).json({response})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    create,
    update,
    getAll,
    getByID,
    deleteById
}