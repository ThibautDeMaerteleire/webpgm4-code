/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input AuthorInput {
    id: ID
  }
  input BookInput {
    id: ID
    status: Status
    title: String
    releaseDate: Date
    rating: Int
    authors: [AuthorInput]
  }
`