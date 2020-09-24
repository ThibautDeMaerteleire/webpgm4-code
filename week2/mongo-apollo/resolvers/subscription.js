/**
 * The Subscription Resolvers
 */

const books = require('../data/books');
const pubsub = require('./pubsub');

module.exports = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
    }
  }
}