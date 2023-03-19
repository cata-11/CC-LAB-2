const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books');

const app = express();

const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use(booksRoutes);

app.use('*', (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: error.message });
});

app.use((err, req, res, next) => {
  let message;
  let status;
  if (!err.message) {
    message = 'Internal server error';
  } else {
    message = err.message;
  }
  if (!err.status) {
    status = 500;
  } else {
    status = err.status;
  }

  res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
