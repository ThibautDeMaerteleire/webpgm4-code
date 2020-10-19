# A GraphQL Spotify API

This GraphQL API is the result of the Spotify application, as seen in the WebPGM4 course.

## Getting Started

1. Install node modules via `npm install`
2. Add in your .env file:
  - Your GraphQL port with `GRAPHQL_PORT`
  - Your MongoDB connection string with `MONGODB_CONNECTIONSTRING`
  - Your Security salt with `TOKEN_SALT`
3. Open up GraphQL playground by surfing `http://localhost:PORT`

## Available types
- `Date`: A date
- `Color`: The color that will be used in the UI
- `Playlist`: Represents a playlist
- `Song`: Represents a song in a playlist
- `User`: Represents a user for authentication
- `AuthData`: The date with a JWT token and userID

## Available inputs
- `PlaylistInput`: takes `title`, `author` and `color`
- `SongInput`: takes `title`, `artist` and `url`
- `UserInput`: takes `email` and `password`

## Available queries
- `playlists:[Playlist]`: Gets all the playlists
- `playlist(id:ID!):Playlist`: Gets a playlist based on the ID of an existing playlist
- `login(user: UserInput):AuthData`: Login a user with username and password, authentication
- `users:[User]`: Get a list of users in the api
- `user(id:ID):User`: Gets a user based on the ID of an existing user

## Available mutations
- `addPlaylist(playlist: PlaylistInput):Playlist`: Adds a playlist in the database
- `addSongToPlaylist(playlistId: ID!, song: SongInput):Playlist`: Adds a song to the playlist
- `register(user: UserInput):User`: Register a user
- `setPlaylistOwner(userId: ID, playlistId: ID):Playlist`: Sets the owner of a playlist

## Available subscriptions
- `songAdded`: Will be triggerd when a new song was added to a playlist
