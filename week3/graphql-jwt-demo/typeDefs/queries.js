/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    login(user: UserInput):AuthData
    doingSomething:LogData
  }
`