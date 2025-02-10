const mongoose = require('mongoose');

// Define the Record schema
const recordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true }, // You can store time or numeric data as a string
  category: { type: String, required: true }
});

// Create the Record model
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;