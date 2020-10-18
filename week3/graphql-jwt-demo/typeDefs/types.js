/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  type AuthData {
    userId: ID
    token: String
  }

  type User {
    id: ID
    email: String
    password: String
  }

  type LogData {
    status: String
  }
`