const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password:{ type: String },
  role: {type: String, enum: ["admin", "user"], default: "user"},
  image: {type: String },
  address: [
    {
      display_name: { type: String },
      lat: { type: Number },
      lon: { type: Number },
      address: { type: String }
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
