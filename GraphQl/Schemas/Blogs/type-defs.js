const { gql } = require("apollo-server");

const blogTypeDef = gql`
  type Blog {
    id: ID!
    title: String!
    description: String!
    tags: [String]
    upvotes: [upvotes]
    comments: [Comment]
    createdAt: Int!
  }

  type upvotes {
    user: String!
  }

  type Comment {
    id: ID!
    comment: String!
    user: String!
    upvotes: [upvotes]
    createdAt: Int!
  }

  type Response {
    message: String!
    success: String!
  }

  input BlogInput {
    title: String!
    description: String!
    tags: [String]
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
