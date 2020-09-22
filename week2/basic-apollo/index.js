/**
 * Basic GraphQL
 * https://graphql.org/
 */

/**
 * Importing some libraries
 */

const  { ApolloServer, gql } = require('apollo-server');
const books = require('./books');

/**
 * Step 1: Defining our Types of data via a schema
 * - https://graphql.org/learn/schema/
 * - Install the GraphQL extension in VSCode
 * - No comma's
 */

const types = gql`
  type Book {
    title: String
    releaseDate: String
    rating: Int
  }
`

/**
 * Step 2: Defining our Queries
 */

const queries = gql`
  type Query {
    books:[Book]
  }
`

/**
 * Step 3: Defining the resolvers
 */

const resolvers = {
  Query: {
    books: () => books
  }
}

/**
 * Step 4: Combine our GraphQl type definitions (types + queries + ...)
 */

const typeDefs = [
  types,
  queries
]

/**
 * Step 5: Start the ApolloServer
 */

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});