const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type User {
    id: ID!
    avatar: String
    bio: String
    name: String!
    email: String!
    nationality: String!
    createdAt: String!
  }
  
  type Profile {
    id: ID!
    avatar: String
    name: String!
    bio: String
    email: String!
    nationality: String
    followers: [User]
    following: [User]
    createdAt: String!
    blogs: [Blog]
  }

  input login {
    email: String!
    password: String!
  }

  input signUp {
    email: String!
    name: String!
    bio: String
    avatar: String
    password: String!
    nationality: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    hello: String!
    getUsersBlogs: [Blog]!
    getProfile(userId: ID!): Profile!
  }

  type Mutation {
    login(input: login!): AuthPayload!
    signUp(input: signUp!): User!
    followUnfollowUser(id: ID!): Boolean!
  }
`;

module.exports = { userTypeDefs };
