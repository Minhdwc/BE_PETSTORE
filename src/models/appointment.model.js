const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryAppointment: { type: String, required: true },
    time: { type: Date, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
})

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = { Appointment };