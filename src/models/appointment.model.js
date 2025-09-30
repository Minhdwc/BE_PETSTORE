const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  petInfo: {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    species: { type: String, required: true },
    gender: { type: Boolean, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  services: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  ],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  notes: { type: String },
  totalPrice: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = { Appointment };
