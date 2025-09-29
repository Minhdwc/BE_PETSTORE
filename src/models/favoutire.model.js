const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      itemType: { type: String, required: true, enum: ["Product", "Pet"] },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "itemType",
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Favourite = mongoose.model("Favourite", FavouriteSchema);
module.exports = Favourite;
