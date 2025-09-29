const joi = require("joi");
const serviceService = require("../services/service.service");

const Schema = joi.object({
    name: joi.string().required().max(100),
    description: joi.string().required().max(500),
    price: joi.number().required().min(0),
    duration: joi.number().required().min(15).max(480),
    category: joi.string().valid('grooming', 'health', 'training', 'other').required(),
    image_url: joi.string().uri().allow(null, ''),
    isActive: joi.boolean().default(true),
    maxBookingsPerDay: joi.number().min(1).max(50).default(10),
    requirements: joi.array().items(joi.string().max(100)),
    benefits: joi.array().items(joi.string().max(100))
});


const create = async (req, res) => {
    try {
        const data = req.body;
        const { error, value } = Schema.validate(data);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const response = await serviceService.create(value);
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const { 
            category, 
            isActive, 
            minPrice, 
            maxPrice, 
            page, 
            limit, 
            sortBy, 
            sortOrder 
        } = req.query;
        
        const response = await serviceService.getAll(
            category, 
            isActive, 
            minPrice, 
            maxPrice, 
            page, 
            limit, 
            sortBy, 
            sortOrder
        );
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Service ID is required" });
        }
        const response = await serviceService.getById(id);
        return res.status(200).json(response);
    } catch (err) {
        if (err.status === "Error") {
            return res.status(404).json({ message: err.message });
        }
        return res.status(500).json({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "Service ID is required" });
        }
    
        
        const response = await serviceService.update(id, value);
        return res.status(200).json(response);
    } catch (err) {
        if (err.status === "Error") {
            return res.status(404).json({ message: err.message });
        }
        return res.status(500).json({ message: err.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Service ID is required" });
        }
        const response = await serviceService.deleteById(id);
        return res.status(200).json(response);
    } catch (err) {
        if (err.status === "Error") {
            return res.status(404).json({ message: err.message });
        }
        return res.status(500).json({ message: err.message });
    }
};

const search = async (req, res) => {
    try {
        const { q, limit } = req.query;
        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }
        const response = await serviceService.searchByName(q, limit || 10);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }
        const response = await serviceService.getByCategory(category);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const toggleActive = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Service ID is required" });
        }
        const response = await serviceService.toggleActive(id);
        return res.status(200).json(response);
    } catch (err) {
        if (err.status === "Error") {
            return res.status(404).json({ message: err.message });
        }
        return res.status(500).json({ message: err.message });
    }
};

const getActiveServices = async (req, res) => {
    try {
        const response = await serviceService.getActiveServices();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById,
    search,
    getByCategory,
    toggleActive,
    getActiveServices,
};
