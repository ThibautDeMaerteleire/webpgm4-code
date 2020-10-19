/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input PlaylistInput {
    title: String
    author: String
    color: Color
  }

  input SongInput {
    title: String
    artist: String
    url: String
  }

  input UserInput {
    email: String
    password: String
  }
`