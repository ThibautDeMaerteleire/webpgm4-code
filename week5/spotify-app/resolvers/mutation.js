/**
 * The Mutation Resolvers
 */

const { Playlist, User } = require('../mongo/models');
const { ApolloError, AuthenticationError } = require('apollo-server');
const pubsub = require('./pubsub');
const bcrypt = require('bcrypt');

module.exports = {
  Mutation: {
    addPlaylist: async (parent, { playlist }, context) => {
      try {
        return await Playlist.create({
          ...playlist,
          addedOn: new Date(),
          editedOn: new Date(),
          songs: []
        });
      } catch(e) {
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },

    setPlaylistOwner: async (parent, { userId, playlistId }, context) => {
      try {
        // get and validate the playlist
        const playlistExists = await Playlist.exists({ _id: playlistId });
        if(!playlistExists) throw new ApolloError("No playlist was found");

        // get the playlist
        const playlist = await Playlist.findOne({ _id: playlistId });

        // add a song to the playlist
        playlist.owner = userId;
        playlist.editedOn = new Date();

        // save and return
        return await playlist.save();
      }
      catch(e) {
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },

    addSongToPlaylist: async (parent, { playlistId, song }, context) => {
      try {
        // get and validate the playlist
        const playlistExists = await Playlist.exists({ _id: playlistId });
        if(!playlistExists) throw new ApolloError("No playlist was found");

        // get the playlist
        const playlist = await Playlist.findOne({ _id: playlistId });

        // check if we are allowed to add a song
        if(context.userId !== playlist.owner) {
          throw new AuthenticationError('User is not allowed to add songs.');
        }

        // add a song to the playlist
        playlist.songs.push(song);
        playlist.editedOn = new Date();
        const updatedPlaylist = await playlist.save();

        // get the new song from updated playlist
        const newSong = updatedPlaylist.songs[updatedPlaylist.songs.length-1];

        // let them know
        pubsub.publish('SONG_ADDED', { songAdded: newSong });

        // return the playlist with added song
        return playlist;
      }
      catch(e) {
        if(e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },

    register: async (parent, { user }) => {
      // destructure user
      const { email, password } = user;

      // validate if the user exists
      const userExists = await User.exists({ email });
      if(userExists) throw new Error('User already exists.')

      // create hash
      const hashedPassword = bcrypt.hashSync(password, 12);

      // create new user
      const newUser = await User.create({
        email,
        password: hashedPassword
      });

      // reset the password for security issues
      newUser.password = null;

      // return the user
      return newUser;
    }
  }
}