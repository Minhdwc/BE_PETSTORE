const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeciesSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
})

const Species = mongoose.model('Species', SpeciesSchema);
module.exports = Species;