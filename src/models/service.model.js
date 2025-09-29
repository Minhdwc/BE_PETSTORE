const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { 
        type: String, 
        required: true,
    },
    description: { 
        type: String, 
        required: true,
    },
    price: { 
        type: Number, 
        required: true,
        min: 0
    },
    duration: { 
        type: Number, 
        required: true,
    },
    category: { 
        type: String, 
        required: true
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});


const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
