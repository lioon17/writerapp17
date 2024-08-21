const mongoose = require('mongoose');
const Counter = require('./counter'); // Ensure the path to your Counter model is correct

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: String,
    paperType: String,
    subjectArea: String,
    topic: String,
    paperDetails: String,
    paperFormat: String,
    references: Number,
    academicLevel: String,
    pageCount: Number,
    spacing: String,
    urgency: String,
    additionalInstructions: String,
    additionalServices: [String],
    notifications: [String],
    email: String,
    phoneNumber: String,
    fullName: String,
    preferredContactMethod: String,
    totalPrice: Number,
    files: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Not Paid'],
        default: 'Not Paid'
    }
});

orderSchema.pre('save', async function(next) {
    if (this.isNew && this.paymentStatus === 'Not Paid' && !this.orderId) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'orderId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.orderId = counter.seq;
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
