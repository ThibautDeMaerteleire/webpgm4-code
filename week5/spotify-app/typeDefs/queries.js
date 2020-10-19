/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    playlists:[Playlist]
    playlist(id:ID!):Playlist
    login(user: UserInput):AuthData
    users:[User]
    user(id:ID):User
  }
`