/**
 * The Query Resolvers
 */

const books = require('../data/books');
const authors = require('../data/authors');

module.exports = {
  Query: {
    books: () => books,
    // most useful is context & args
    // more information about the others can be found on
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
    book: (parent, { id }, context, info) => books.find((book) => book.id === id)
  },

  Book: {
    authors: (parent, args, context) => {
      const authorIds = parent.authors.map(author => author.id);
      return authors.filter(author => authorIds.includes(author.id));
    }
  }
}