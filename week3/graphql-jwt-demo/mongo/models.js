/**
 * Importing mongoose
 */

const mongoose = require('mongoose');

/**
 * Importing schemas
 */

const UserSchema = require('./schemas/user');

/**
 * Creating mongoose models
 */

const User = mongoose.model('User', UserSchema);

/**
 * Exporting the models
 */

module.exports = {
  User
}