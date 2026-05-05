const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weather-app')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Weather App Server is running!' });
});

// Weather routes placeholder
app.get('/api/weather', (req, res) => {
  res.json({ message: 'Weather API endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});