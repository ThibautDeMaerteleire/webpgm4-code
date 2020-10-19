/**
 * Modelling the playlist
 */

const mongoose = require('mongoose');

const SongSchema = require('./song');

const PlaylistSchema = new mongoose.Schema({
  title: String,
  author: String,
  color: String,
  addedOn: Date,
  editedOn: Date,
  owner: String,
  songs: [SongSchema]
});

module.exports = PlaylistSchema;