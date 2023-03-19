const express = require('express');

const controller = require('../controllers/search-movies');

const router = express.Router();

router.get('/search-movies', controller.search);

module.exports = router;
