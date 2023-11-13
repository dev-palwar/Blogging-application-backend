const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type User {
    id: ID
    avatar: String
    name: String!
    createdAt: String!
  }

  type Profile {
    id: ID!
    name: String!
    avatar: String
    nationality: String
    bio: String
    followers: [User]
    following: [User]
    blogs: [Blog]
    createdAt: String!
  }

  input login {
    email: String!
    password: String!
  }

  input signUp {
    name: String!
    avatar: String
    email: String!
    bio: String
    password: String!
    nationality: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    hello: String!
    getProfile(input: ID!): Profile!
  }

  type Mutation {
    login(input: login!): AuthPayload!
    signUp(input: signUp!): Boolean!
    followUnfollowUser(input: ID!): Boolean!
    logout(input: ID!): Boolean!
  }
`;

module.exports = { userTypeDefs };
