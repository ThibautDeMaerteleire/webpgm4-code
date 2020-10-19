/**
 * The GraphQL mutations
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    addPlaylist(playlist: PlaylistInput):Playlist
    addSongToPlaylist(playlistId: ID!, song: SongInput):Playlist
    register(user: UserInput):User
    setPlaylistOwner(userId: ID, playlistId: ID):Playlist
  }
`