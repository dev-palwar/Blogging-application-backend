const { gql } = require("apollo-server");

const blogTypeDef = gql`
  type Blog {
    id: ID!
    poster: String
    title: String!
    description: String!
    Author: String
    category: [Category!]
    tags: [String]
    upvotes: [Upvotes]
    comments: [Comment]
    createdAt: String!
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

  type Upvotes {
    user: String!
  }

  type Comment {
    id: ID!
    comment: String!
    user: String!
    upvotes: [Upvotes]
    createdAt: String!
  }

  type Response {
    message: String!
    success: String!
  }

  input BlogInput {
    poster: String
    title: String!
    description: String!
    tags: [String]
    category: [Category]
  }

  input CommentInput {
    blogId: String!
    comment: String!
  }

  input deleteCommentInput {
    blogId: ID!
    commentId: ID!
  }

  type Query {
    findBlog(id: ID): Blog!
  }

  type Mutation {
    createBlog(input: BlogInput!): Blog!
    deleteBlog(id: ID!): Response!
    upvoteOrDownvoteBlog(blogId: ID!): Response!
    addCommentToBlog(input: CommentInput!): Response!
    upvoteComment(blogId: ID!, commentId: ID!): Response!
    deleteCommentFromBlog(input: deleteCommentInput!): Response!
  }
`;

module.exports = { blogTypeDef };
