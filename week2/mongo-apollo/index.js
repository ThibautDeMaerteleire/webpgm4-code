/**
 * Godlike GraphQL with MongoDB:
 * - Installing mongoose (https://mongoosejs.com/)
 * - Creating a MongoDB database, hosted on Atlas (https://www.mongodb.com/)
 * - Modeling via mongoose (Book & Author)
 * - Changed addBook, books
 * - Added addAuthor
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const  { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

/**
 * Mongoose Database
 */

// NOTE: These one needs to filled in with your personal account
const mongodbUser = "";
const mongodbPwd = "";

mongoose.connect(
  `mongodb+srv://${mongodbUser}:${mongodbPwd}@graphql-demo.wibl8.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

/**
 * Apollo Server
 */

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

/**
 * Combine Mongoose & Apollo
 */

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected!');
  server
    .listen({
      port: process.env.PORT || 4000
    })
    .then(({ url }) => {
      console.log(`Server started at ${url}`);
    });
});