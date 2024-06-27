const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const dotenv = require('dotenv');

dotenv.config();

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
}, { collection: 'newVehicleSales' }); // Ensure the new collection name is specified here as well

const Sale = mongoose.model('Sale', saleSchema);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

function seedDatabase() {
    const sales = [];

    fs.createReadStream('sales.csv')
        .pipe(csv())
        .on('data', (row) => {
            row.delivered = row.delivered === 'true';
            row.deliveryDate = new Date(row.deliveryDate);
            sales.push(row);
        })
        .on('end', async () => {
            try {
                await Sale.insertMany(sales);
                console.log('Data successfully seeded');
                mongoose.connection.close();
            } catch (err) {
                console.error('Error seeding data:', err);
            }
        });
}
