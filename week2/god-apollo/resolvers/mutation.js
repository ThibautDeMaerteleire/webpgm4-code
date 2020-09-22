/**
 * The Mutation Resolvers
 */

const books = require('../data/books');
const pubsub = require('./pubsub');

module.exports = {
  Mutation: {
    addBook: (parent, { book }, { userAllowed }) => {
      if(!userAllowed) throw new Error('User is not allowed to do this!'); // coming in from context

      // let the subscribers know we have added a book
      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return [...books, book ]
    }
  }
}