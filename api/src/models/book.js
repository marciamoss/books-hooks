const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, index: true, unique: true},
  title: { type: String, required: true },
  authors: { type: String },
  booklink: { type: String },
  bookimg: { type: String } ,
  synopsis: { type: String} ,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', BookSchema);
Book.createIndexes();

module.exports = Book;
