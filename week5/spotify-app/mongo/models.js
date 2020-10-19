/**
 * Importing mongoose
 */

const mongoose = require('mongoose');

/**
 * Importing schemas
 */

const PlaylistSchema = require('./schemas/playlist');
const UserSchema = require('./schemas/user');

/**
 * Creating mongoose models
 */

const Playlist = mongoose.model('Playlist', PlaylistSchema);
const User = mongoose.model('User', UserSchema);

/**
 * Exporting the models
 */

module.exports = {
  Playlist,
  User
}