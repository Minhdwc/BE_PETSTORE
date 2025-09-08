const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  item: [
    {
      itemType: { type: String, required: true, enum: ["Product", "Pet"] },
      itemIdType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "itemType",
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Favourite = mongoose.model("Favourite", FavouriteSchema);
module.exports = Favourite;
