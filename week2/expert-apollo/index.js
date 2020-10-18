/**
 * Expert GraphQL:
 * - Changing to scalar Date
 * - Defining what the scalar Data actually does (importing some stuff) with GraphQLScalarType
 * - Relational data with authors and updating the resolvers for BOOK
 * - Adding a mutation (addBook) via parameters
 * - Defining Input instead of using parameters (for BOOK & for Authors)
 *
 * More information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const  { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const books = require('./books');
const authors = require('./authors');

/**
 * What we did:

 */

/**
 * Step 1: Defining our Types of data via a schema
 */

const types = gql`
  scalar Date

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
    releaseDate: Date
    rating: Int
  }
`

/**
 * Step 4: Defining our Input Types
 * Every single input we can have
 */

const inputs = gql`
  input AuthorInput {
    id: ID
  }
  input BookInput {
    id: ID
    status: Status
    title: String
    releaseDate: Date
    rating: Int
    authors: [AuthorInput]
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
 * Step 3: Defining our Mutations
 */

const mutations = gql`
  type Mutation {
    #addBook(
    #  id: ID
    #  title: String,
    #  releaseDate: Date,
    #): [Book]
    addBook(book: BookInput):[Book]
  }
`

/**
 * Step 4: Defining the resolvers
 */

const queryResolvers = {
  Query: {
    books: () => books,
    // most useful is context & args
    // more information about the others can be found on
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
    book: (parent, { id }, context, info) => books.find((book) => book.id === id)
  },

  Book: {
    title: (parent, args, context) => {
      return "Mijn Titel: " + parent.title
    },
    authors: (parent, args, context) => {
      const authorIds = parent.authors.map(author => author.id);
      return authors.filter(author => authorIds.includes(author.id));
    }
  }
}

const mutationResolvers = {
  Mutation: {
    /*addBook: (parent, { id, title, releaseDate }, context) => {
      const newBooksList = [
        ...books,
        {
          id,
          title,
          releaseDate
        }
      ]
      return newBooksList;
    }*/
    addBook: (parent, { book }, context) => {
      const newBooksList = [
        ...books,
        book
      ]
      return newBooksList;
    }
  }
}

const scalars = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "This type will represent a date",
    parseValue(value) {
      // value from the client
      // it's coming in (e.g. via a Frontend)
      return new Date(value);
    },
    serialize(value) {
      // value send to the client
      // it's getting out (e.g. via a query)
      // return value;
      return value.getTime();
    },
    // parseLiteral converts the data to AST which basically
    // gives us more information about the data that's being handled; e.g. its type
    parseLiteral(ast) {
      if(ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value));
      }
      return null;
    }
  })
}

/**
 * Step 5: Combine our GraphQl type definitions (types + queries + ...)
 */

const typeDefs = [
  types,
  inputs,
  queries,
  mutations
]

/**
 * Step 6: Combine all our resolvers
 */

const resolvers = [
  scalars,
  queryResolvers,
  mutationResolvers
]

/**
 * Step 7: Start the ApolloServer
 */

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server started at ${url}`);
});