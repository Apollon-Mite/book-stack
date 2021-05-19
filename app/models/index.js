const Reader = require('./reader');
const Writer = require('./writer');
const Book = require('./book');
const Feedback = require('./feedback');
const ReaderLikesBook = require('./reader_likes_book');



// un reader a plusieurs feedbacks
Reader.hasMany(Feedback, {
  foreignKey: "reader_id",
  as: "feedbacks"
});

//réciproque : un feedback est lié à un seul reader
Feedback.belongsTo(Reader, {
  foreignKey: "reader_id",
  as: "reader"
});



// un writer a plusieurs books
Writer.hasMany(Book, {
  foreignKey: "writer_id",
  as: "books"
});

//réciproque : un book est lié à un seul writer
Book.belongsTo(Writer, {
  foreignKey: "writer_id",
  as: "writer"
});



// un book a plusieurs feedbacks
Book.hasMany(Feedback, {
  foreignKey: "book_id",
  as: "feedbacks"
});

//réciproque : un feedback est lié à un seul book
Feedback.belongsTo(Book, {
  foreignKey: "book_id",
  as: "book"
});



// Reader <> Books, via la table de liaison
// "Un Reader possède plusieurs Bookss"
Reader.belongsToMany(Book, {
  as: "readers", // alias de l'association 
  through: ReaderLikesBook, // "via la table de liaison qui s'appelle ..."
  foreignKey: 'reader_id', // le nom de la clef de Product dans la table de liaison
  otherKey: 'book_id', // le nom de la clef de "l'autre" (donc Order)
  timestamps: false // il n'y a pas de updated-at dans la table de liaison
});

// et la réciproque..
Book.belongsToMany(Reader, {
  as: "products", 
  through: ReaderLikesBook,
  foreignKey: 'book_id',
  otherKey: 'reader_id',
  timestamps: false // il n'y a pas de updated-at dans la table de liaison
});


module.exports = { Reader, Writer, Book, Feedback, ReaderLikesBook };