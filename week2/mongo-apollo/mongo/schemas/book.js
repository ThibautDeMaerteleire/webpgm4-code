/**
 * Modelling the book
 */

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  }],
  status: String,
  title: String,
  releaseDate: Date,
  rating: Number
});

module.exports = BookSchema;