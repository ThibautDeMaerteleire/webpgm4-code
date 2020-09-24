/**
 * Importing mongoose
 */

const mongoose = require('mongoose');

/**
 * Importing schemas
 */

const AuthorSchema = require('./schemas/author');
const BookSchema = require('./schemas/book');

/**
 * Creating mongoose models
 */

const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);

/**
 * Exporting the models
 */

module.exports = {
  Author,
  Book
}