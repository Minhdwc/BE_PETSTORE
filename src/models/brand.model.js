const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now() }
})

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;