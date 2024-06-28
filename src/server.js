const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define the schema and specify the collection name
const saleSchema = new mongoose.Schema({
    stockNumber: String,
    clientName: String,
    year: Number,
    make: String,
    model: String,
    color: String,
    advisor: String,
    delivered: Boolean,
    deliveryDate: Date,
    type: {
        type: String,
        enum: ['New BMW', 'Used BMW', 'CPO BMW', 'New MINI', 'CPO MINI', 'Used MINI']
    }
}, { collection: 'sales' }); // Specify the collection name

const Sale = mongoose.model('Sale', saleSchema);

app.get('/api/sales', async (req, res) => {
    const sales = await Sale.find();
    res.send(sales);
});

app.post('/api/sales', async (req, res) => {
    const sale = new Sale(req.body);
    await sale.save();
    res.send(sale);
});

app.put('/api/sales/:id', async (req, res) => {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(sale);
});

app.delete('/api/sales/:id', async (req, res) => {
    await Sale.findByIdAndDelete(req.params.id);
    res.send({ message: 'Sale deleted' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
