const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    itemType: { type: String, required: true, enum: ["Product", "Pet"] },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemType' },
    items:[
        {
            id: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemType' },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }
    ],
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;