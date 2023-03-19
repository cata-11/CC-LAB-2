const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const apiKey = process.env.API_KEY;

app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const apiUrl = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);
    const movies = response.data.Search;
    res.json(movies);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

const port = 3002;
app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});
