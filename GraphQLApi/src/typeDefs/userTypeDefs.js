const { gql } = require('apollo-server');

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input AddUserInput {
    name: String!
    email: String!
  }

  input UserFilterInput {
    name: String
    email: String
  }

  type Query {
    users(filter: UserFilterInput): [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!

    addUsers(users: [AddUserInput!]!): [User!]!

    deleteUser(id: ID!): User
  }
`;

module.exports = userTypeDefs;
