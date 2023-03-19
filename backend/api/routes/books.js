const express = require('express');

const controller = require('../controllers/books');

const router = express.Router();

router.get('/book/:id', controller.getBookById);
router.get('/books', controller.getAllBooks);

router.post('/book/:id', controller.createBookToId);
router.post('/book', controller.createBook);

router.put('/book/:id', controller.updateBookById);
router.put('/books', controller.updateBooks);

router.delete('/book/:id', controller.deleteBookById);
router.delete('/books', controller.deleteBooks);

module.exports = router;
