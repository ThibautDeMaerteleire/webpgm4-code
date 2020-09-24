/**
 * The Query Resolvers
 */

//const books = require('../data/books');
//const authors = require('../data/authors');
const { Book } = require('../mongo/models');

module.exports = {
  Query: {
    books: async () => await Book.find().populate('authors').exec(),
    book: async (parent, { id }, context, info) => await Book.findById(id).populate('authors').exec()
  },

  Book: {
    authors: async ({ authors }, args, context) => {
      return authors.map(({ _id, name }) => ({ id: _id, name }));
    }
  }
}