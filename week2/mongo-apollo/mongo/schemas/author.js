/**
 * Modelling the book
 */

const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: String
});

module.exports = AuthorSchema;