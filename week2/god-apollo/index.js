/**
 * Godlike GraphQL:
 * - We restructured the GraphQL in seperate files
 * - We have changed/added context
 * - We have added subscriptions
 *
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const  { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// create an apollo server instance

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // ttps://graphql.org/learn/introspection/
  playground: true,
  context: (({ req }) => {
    // console.log(req);
    return { userAllowed: true }
  })
});

server
  .listen({
    port: process.env.PORT || 4000
  })
  .then(({ url }) => {
    console.log(`Server started at ${url}`);
  });