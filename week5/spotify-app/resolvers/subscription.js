/**
 * The Subscription Resolvers
 */

const pubsub = require('./pubsub');

module.exports = {
  Subscription: {
    songAdded: { subscribe: () => pubsub.asyncIterator("SONG_ADDED") }
  }
}