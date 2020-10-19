/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  enum Color {
    RED
    BLUE
    GREEN
  }

  type Playlist {
    id: ID!
    title: String
    author: String
    color: Color
    addedOn: Date
    editedOn: Date
    owner: ID
    songs:[Song]
  }

  type Song {
    id: ID!
    title: String
    artist: String
    url: String
  }

  type AuthData {
    userId: ID
    token: String
  }

  type User {
    id: ID
    email: String
    password: String
  }
`