const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config({
  path: __dirname + '/.env',
});

const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('MONGO_URI:', process.env.MONGO_URI ? 'loaded' : 'missing');
console.log(
  'OPENWEATHER_KEY:',
  process.env.OPENWEATHER_KEY ? 'loaded' : 'missing'
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log('MongoDB error:', error));

app.get('/', (req, res) => {
  res.send('Server works');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    const newUser = new User({
      username,
      email,
      password,
      cities: [],
    });

    await newUser.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        cities: newUser.cities,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Registration error',
      error: error.message,
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        cities: user.cities || [],
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
    });
  }
});

app.post('/users/:id/cities', async (req, res) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({
        message: 'City is required',
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const normalizedCity = city.trim();

    if (user.cities.includes(normalizedCity)) {
      return res.status(400).json({
        message: 'City already added',
      });
    }

    user.cities.push(normalizedCity);

    await user.save();

    res.json({
      message: 'City added',
      cities: user.cities,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding city',
      error: error.message,
    });
  }
});

app.delete('/users/:id/cities/:city', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const cityToDelete = decodeURIComponent(req.params.city);

    user.cities = user.cities.filter(city => city !== cityToDelete);

    await user.save();

    res.json({
      message: 'City deleted',
      cities: user.cities,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting city',
      error: error.message,
    });
  }
});

app.get('/weather/current/:city', async (req, res) => {
  try {
    const city = req.params.city;

    if (!process.env.OPENWEATHER_KEY) {
      return res.status(500).json({
        message: 'OpenWeather API key is missing',
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${process.env.OPENWEATHER_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || 'Weather request failed',
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Weather request error',
      error: error.message,
    });
  }
});

app.get('/weather/forecast/:city', async (req, res) => {
  try {
    const city = req.params.city;

    if (!process.env.OPENWEATHER_KEY) {
      return res.status(500).json({
        message: 'OpenWeather API key is missing',
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${process.env.OPENWEATHER_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || 'Forecast request failed',
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Forecast request error',
      error: error.message,
    });
  }
});

app.get('/actual-news', async (req, res) => {
  try {
    const topic = req.query.topic || 'weather';
    const page = req.query.page || 1;

    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({
        message: 'News API key is missing',
      });
    }

    const url = `https://newsapi.org/v2/everything?q=${topic}&language=en&sortBy=publishedAt&pageSize=12&page=${page}&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || 'News request failed',
      });
    }

    const articles = data.articles
      .filter(article => article.title && article.urlToImage && article.url)
      .map(article => ({
        title: article.title,
        image: article.urlToImage,
        url: article.url,
        source: article.source?.name,
      }));

    res.json({
      topic,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Actual news request error',
      error: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
