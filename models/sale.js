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
    type: { type: String, enum: ['New BMW', 'Used BMW', 'CPO BMW', 'New MINI', 'CPO MINI', 'Used MINI'] }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
