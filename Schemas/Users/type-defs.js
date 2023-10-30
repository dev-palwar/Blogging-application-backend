const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type Query {
    getUser(input: login): User
  }

  input login {
    email: String!
    password: String!
  }

  type User {
    id: ID
    name: String!
    email: String!
    nationality: String!
    createdAt: Int!
  }

  type Mutation {
    createUser(input: signUp): User
  }

  input signUp {
    name: String!
    email: String!
    password: String
    nationality: String!
  }
`;

module.exports = { userTypeDefs };
