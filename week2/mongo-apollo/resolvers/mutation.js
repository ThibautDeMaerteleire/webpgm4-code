/**
 * The Mutation Resolvers
 */

// const books = require('../data/books');
const mongoose = require('mongoose')
const { Author, Book } = require('../mongo/models');
const pubsub = require('./pubsub');

module.exports = {
  Mutation: {
    addBook: async (parent, { book }, { userAllowed }) => {
      try
      {
        if(!userAllowed) throw new Error('User is not allowed to do this!'); // coming in from context

        // let the subscribers know we have added a book
        pubsub.publish('BOOK_ADDED', { bookAdded: book });

        // define the authors (empty is default)
        let authors = [];

        // get the authors
        if(book.authors && book.authors.length > 0) {
          const authorIds = book.authors.map(({ id }) => id);
          authors = await Author.find({ _id: { $in: authorIds } });
        }

        // add to our database
        await Book.create({ ...book, authors });

        // return the new books
        return await Book.find();
      }
      catch(e)
      {
        console.log(e.message);
      }
    },

    addAuthor: async(parent, { name }) => {
      try {
        return await Author.create({ name });
      } catch(e) {
        return { name: "Unknown" };
      }
    }
  }
}