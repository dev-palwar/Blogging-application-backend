const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type User {
    id: ID
    name: String!
    email: String!
    nationality: String!
    createdAt: Int!
  }

  type Query {
    login(input: login): User
    hello : String
  }

  input login {
    email: String!
    password: String!
  }
  
  input signUp {
    name: String!
    email: String!
    password: String
    nationality: String!
  }

  type Mutation {
    signUp(input: signUp!): User
    followUnfollowUser(id: ID!): Response
  }

`;

module.exports = { userTypeDefs };
