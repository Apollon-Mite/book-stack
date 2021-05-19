const express = require('express');

// Middleware to verify tokens
const authorization = require ('./middlewares/auth')

// importer les controllers

//const readerController = require('./controllers/readerController');
//const writerController = require('./controllers/writerController');
const bookController = require('./controllers/bookController');
//const feedbackController = require('./controllers/feedbackController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('HomePage');
});

// BOOKS
router.get('/books', bookController.getAllBooks);


module.exports = router;