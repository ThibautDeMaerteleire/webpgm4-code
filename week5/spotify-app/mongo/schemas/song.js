/**
 * Modelling the song
 */

const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String
});

module.exports = SongSchema;