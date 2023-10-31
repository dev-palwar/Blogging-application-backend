const { gql } = require("apollo-server");

const blogTypeDef = gql`
  type Blog {
    id: ID
    title: String!
    description: String!
    createdAt: Int!
  }

  input BlogInput {
    title: String!
    description: String!
  }

  type Query {
    findBlog(id: ID): Blog
  }

  type Mutation {
    createBlog(input: BlogInput): Blog
  }
`;

module.exports = { blogTypeDef };