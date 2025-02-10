// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB (replace the connection string with your own MongoDB Atlas URI)
const uri = "mongodb+srv://kimmi:810PhDtYI7ucMH64@roverrekorder.kware.mongodb.net/?retryWrites=true&w=majority&appName=roverrekorder";
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Define the Record model
const Record = require('./models/record');

// Routes

// Get all records
app.get('/api/records', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).send('Error fetching records');
  }
});

// Add a new record
app.post('/api/records', async (req, res) => {
  const { title, description, time, category } = req.body;

  if (!title || !description || !time || !category) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newRecord = new Record({ title, description, time, category });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).send('Error saving record');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});