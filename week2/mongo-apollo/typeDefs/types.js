/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  enum Status {
    READ,
    INTERESTED,
    NEVER_READ
  }

  type Author {
    id: ID!
    name: String!
  }

  type Book {
    id: ID!
    authors: [Author]
    status: Status
    title: String
    releaseDate: Date
    rating: Int
  }
`