const joi = require("joi")
const appointmentServices = require("../services/appoiment.service")
const Service = require("../models/service.model")
const dayjs = require("dayjs")

const Schema = joi.object({
    petInfo: joi.object({
        name: joi.string().required(),
        breed: joi.string().required(),
        species: joi.string().required(),
        gender: joi.boolean().required(),
        age: joi.number().min(0).required(),
        weight: joi.number().min(0).required(),
    }).required(),
    services: joi.array().items(joi.string().length(24)).min(1).required(),
    date: joi.string().required(), // YYYY-MM-DD
    time: joi.string().required(), // HH:mm
    notes: joi.string().allow("").optional()
})

const create = async(req, res)=>{
    try{
        if(!req.user?._id){
            return res.status(401).json({message: "Unauthorized"});
        }
        const data = req.body;
        const {error, value} = Schema.validate(data)
        if(error){
            return res.status(400).json({message: error.message});
        }

        const serviceDocs = await Service.find({ _id: { $in: value.services } });
        if(serviceDocs.length !== value.services.length){
            return res.status(400).json({message: "One or more services are invalid"});
        }

        const totalDuration = serviceDocs.reduce((sum, s)=> sum + (s.duration || 0), 0);
        const totalPrice = serviceDocs.reduce((sum, s)=> sum + (s.price || 0), 0);

        const startTime = dayjs(`${value.date} ${value.time}`, "YYYY-MM-DD HH:mm").toDate();
        const endTime = dayjs(startTime).add(totalDuration, 'minute').toDate();

        const toCreate = {
            userId: req.user._id,
            petInfo: value.petInfo,
            services: value.services,
            startTime,
            endTime,
            notes: value.notes,
            totalPrice,
            status: "Pending",
        };

        const response = await appointmentServices.create(toCreate);
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAll = async(req, res)=>{
    try{
        const { page, limit } = req.query
        const response = await appointmentServices.getAll(page, limit);
        return res.status(200).json(response)
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
        return res.status(200).json(response)
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
        return res.status(200).json(response)
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
        return res.status(200).json(response)
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