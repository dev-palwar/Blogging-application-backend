const { gql } = require("apollo-server");

const blogTypeDef = gql`
  type Blog {
    id: ID!
    poster: String
    title: String!
    description: String!
    Author: User
    category: [Category!]
    tags: [String]
    upvotes: [Upvotes]
    comments: [Comment]
    createdAt: String!
  }

  type Upvotes {
    user: User!
  }

  type Comment {
    id: ID!
    comment: String!
    user: User!
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
    category: [Category!]!
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
    getAllBlogs: [Blog]!
    findBlog(id: ID): Blog!
  }

  type Mutation {
    createBlog(input: BlogInput!): Blog!
    deleteBlog(id: ID!): Response!
    upvoteOrUnvoteBlog(blogId: ID!): Boolean!
    addCommentToBlog(input: CommentInput!): Boolean!
    upvoteAndUnvoteComment(blogId: ID!, commentId: ID!): Boolean!
    deleteCommentFromBlog(input: deleteCommentInput!): Response!
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
