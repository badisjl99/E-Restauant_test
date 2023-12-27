
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restaurantdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
  });
  

const Food = mongoose.model('Food', foodSchema);



router.get('/menu', async (req, res) => {
  try {
    const menuItems = await Food.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post('/add', async (req, res) => {
  try {
    const newItem = await Food.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/modify/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const updatedItem = await Food.findByIdAndUpdate(itemId, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.delete('/delete/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await Food.findByIdAndDelete(itemId);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
