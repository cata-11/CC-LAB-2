const express = require('express');

const controller = require('../controllers/search-books');

const router = express.Router();

router.get('/search-books', controller.search);

module.exports = router;
