const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    clientName: String,
    stockNumber: String,
    year: Number,
    make: String,
    model: String,
    color: String,
    advisor: String,
    delivered: Boolean,
    deliveryDate: Date,
    type: { type: String, enum: ['new', 'used'] }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
