const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'items.itemType' },
            itemType: { type: String, required: true, enum: ['Pet', 'Product'] },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }
    ],
    totalQuantity: { type: Number, min: 0},
    totalPrice: { type: Number , min: 0},
    createdAt: { type: Date, default: Date.now },
})

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;