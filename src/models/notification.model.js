const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    message: { type: String, required: true },
    type: { type: String, required: true, },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;