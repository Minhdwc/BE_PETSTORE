const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductionSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number },
    price: { type: Number, required: true },
    image_url: { type: String },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Production = mongoose.model('Production', ProductionSchema);
module.exports = Production;