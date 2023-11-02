const {
  findBlogInDB,
  createBlogInDB,
  deleteBlogFromDB,
  updateUpvotesBlogInDB,
  addCommentToBlogInDB,
  deleteCommentFromBlogInDB,
  upvoteCommentInDB,
} = require("../../../Database/Controllers/blogs");

const blogResolvers = {
  Query: {
    findBlog: (_, args) => {
      return findBlogInDB(args.id);
    },
  },
  Mutation: {
    createBlog: (_, args, { loggedInUser }) => {
      return createBlogInDB(args.input, loggedInUser.userId);
    },
    deleteBlog: (_, args, { loggedInUser }) => {
      return deleteBlogFromDB(args.id, loggedInUser.userId);
    },
    upvoteOrDownvoteBlog: (_, args, { loggedInUser }) => {
      return updateUpvotesBlogInDB(args.blogId, loggedInUser.userId);
    },
    addCommentToBlog: (_, args, { loggedInUser }) => {
      return addCommentToBlogInDB(args.input, loggedInUser.userId);
    },
    upvoteComment: (_, args, { loggedInUser }) => {
      return upvoteCommentInDB(args, loggedInUser.userId);
    },
    deleteCommentFromBlog: (_, args, { loggedInUser }) => {
      return deleteCommentFromBlogInDB(args.input, loggedInUser.userId);
    },
  },
};

module.exports = { blogResolvers };
