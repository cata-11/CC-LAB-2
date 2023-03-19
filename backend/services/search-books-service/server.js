const express = require('express');
const cors = require('cors');
const axios = require('axios');
const env = require('dotenv');

const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
  const query = req.query.q;

  const result = env.config();
  if (result.error) {
    throw result.error;
  }
  const apiKey = process.env.API_KEY;

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    const response = await axios.get(apiUrl);
    const books = response.data.items;
    console.log(books)
    res.status(200).json({
      books: books
    });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});
