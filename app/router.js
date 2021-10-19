const express = require('express');

// Middleware to verify tokens
const authorization = require ('./middlewares/auth')

// importer les controllers

const readerController = require('./controllers/readerController');
const writerController = require('./controllers/writerController');
const bookController = require('./controllers/bookController');
//const feedbackController = require('./controllers/feedbackController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('HomePage');
});

// BOOKS
router.get('/books', bookController.getAllBooks);
router.post('/writer/:id(\\d+)/book', authorization, bookController.addNewBook)
router.post('/reader/:id(\\d+)/book', authorization, bookController.saveBookToStack)
router.delete('/reader/:id(\\d+)/book', authorization, bookController.removeBookFromStack)

// WRITER
router.get('/writers', writerController.getAllWriters);
router.post('/writer/login', writerController.writerHandleLoginForm);
router.post('/writer/signup', writerController.writerHandleSignupForm);


// READER
router.get('/readers', readerController.getAllReaders);
router.post('/reader/login', readerController.readerHandleLoginForm);
router.post('/reader/signup', readerController.readerHandleSignupForm);


module.exports = router;