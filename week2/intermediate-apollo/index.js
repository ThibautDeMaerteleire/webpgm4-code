/**
 * Intermediate GraphQL
 * https://graphql.org/
 */

/**
 * Importing some libraries
 */

const  { ApolloServer, gql } = require('apollo-server');
const books = require('./books');

/**
 * What we did:
 * - Added ID
 * - Added Author(s)
 * - ENUM (specific answer types). e.g. Color.black, Color.purple, Color.white,...
 * - Added Non Nullable properties (always require)
 * - Added book resolver and query (+ added ids to our book) WITH parameters
 */

/**
 * Step 1: Defining our Types of data via a schema
 */

const types = gql`
  enum Status {
    READ,
    INTERESTED,
    NEVER_READ
  }

  type Author {
    id: ID!
    name: String!
  }

  type Book {
    id: ID!
    authors: [Author] # Valid null, [], [...author data] - Not Valid [... author data without id or name]
    #authors: [Author]! Valid [], [...author data]
    #authors: [Author!] [...author data]
    status: Status
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
    book(id:ID): Book
  }
`

/**
 * Step 3: Defining the resolvers
 */

const resolvers = {
  Query: {
    books: () => books,
    // most usefull is context & args
    // more information about the others can be found on
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
    book: (parent, { id }, context, info) => books.find((book) => book.id === id)
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