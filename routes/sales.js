const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');

// GET all sales
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new sale
router.post('/', async (req, res) => {
    const sale = new Sale(req.body);
    try {
        const newSale = await sale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a sale
router.put('/:id', async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a sale
router.delete('/:id', async (req, res) => {
    try {
        await Sale.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sale deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
