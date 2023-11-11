const {
  getAllBlogsFromDB,
  findBlogInDB,
  createBlogInDB,
  deleteBlogFromDB,
  updateBlogUpvotesInDB,
  addCommentToBlogInDB,
  deleteCommentFromBlogInDB,
  upvoteAndUnvoteCommentInDB,
} = require("../../../Database/Controllers/blogs");

const blogResolvers = {
  Query: {
    getAllBlogs: () => {
      return getAllBlogsFromDB();
    },
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
    upvoteOrUnvoteBlog: (_, args, { loggedInUser }) => {
      return updateBlogUpvotesInDB(args.blogId, loggedInUser.userId);
    },
    addCommentToBlog: (_, args, { loggedInUser }) => {
      return addCommentToBlogInDB(args.input, loggedInUser.userId);
    },
    upvoteAndUnvoteComment: (_, args, { loggedInUser }) => {
      return upvoteAndUnvoteCommentInDB(args, loggedInUser.userId);
    },
    deleteCommentFromBlog: (_, args, { loggedInUser }) => {
      return deleteCommentFromBlogInDB(args.input, loggedInUser.userId);
    },
  },
};

module.exports = { blogResolvers };
