/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    books:[Book]
    book(id:ID): Book
  }
`