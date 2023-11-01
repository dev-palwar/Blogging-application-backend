const {
  findBlogInDB,
  createBlogInDB,
  deleteBlogFromDB,
  updateUpvotesBlogInDB,
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
  },
};

module.exports = { blogResolvers };
