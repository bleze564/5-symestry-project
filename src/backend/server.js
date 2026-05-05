const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 👉 позволяет читать JSON из React
app.use(express.json());

// 👉 разрешает запросы с фронта
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
