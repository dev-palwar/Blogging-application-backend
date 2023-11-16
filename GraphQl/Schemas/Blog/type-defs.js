const { gql } = require("apollo-server");

const blogTypeDef = gql`
  type Blog {
    id: ID!
    poster: String
    title: String!
    description: String!
    author: User!
    category: [Category!]
    upvotes: [User]
    comments: [Comments]
    createdAt: String!
  }

  type Comments {
    id: ID!
    comment: String!
    upvotes: [User]
    author: User!
  }

  input BlogInput {
    title: String!
    description: String!
    poster: String
    category: [Category]
  }

  input AddComment {
    blogId: String!
    comment: String!
  }

  type Query {
    getAllBlogs: [Blog]!
    findBlog(input: ID!): Blog!
  }

  type Mutation {
    createBlog(input: BlogInput!): ID!
    deleteBlog(input: ID!): Boolean!
    upvoteOrDownvoteBlog(input: ID!): Boolean!
    addCommentToBlog(input: AddComment!): Boolean!
    upvoteUnvoteComment(input: ID!): Boolean!
    deleteComment(input: ID!): Boolean!
  }

  enum Category {
    PROGRAMMING
    ANIME
    MEDIA
    SELF_IMPROVEMENT
    RELATIONSHIP
    DARK
    POLITICS
    GAMING
  }
`;

module.exports = { blogTypeDef };
