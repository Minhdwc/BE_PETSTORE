const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: { type: String, required: true },
    species: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Species'},
    generic: { type: String, required: true },
    gender: { type: String, required: true, enum:["Male", "Female"] },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image_url: { type: String },
    status: { type: String, enum: ['available', 'pending', 'sold'], default: 'available' },
    createdAt: { type: Date, default: Date.now },
})

const Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;