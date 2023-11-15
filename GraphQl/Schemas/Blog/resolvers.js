const {
  createBlogInDB,
  deleteBlogFromDB,
  upvoteUnvoteBlogInDB,
  addCommentToBlog,
  upvoteUnvoteCommentInDB,
  deleteCommentFromBlogInDB,
  getBlog,
  getAllBlogsFromDB,
} = require("../../../Database/Controllers/blog");

const blogResolvers = {
  Query: {
    findBlog: (_, args) => {
      return getBlog(args.input);
    },
    getAllBlogs: () => {
      return getAllBlogsFromDB();
    },
  },
  Mutation: {
    createBlog: (_, args, { loggedInUser }) => {

      // console.log(args);

      return createBlogInDB(args.input, loggedInUser.userId);
    },
    deleteBlog: (_, args, { loggedInUser }) => {
      return deleteBlogFromDB(args.input, loggedInUser.userId);
    },
    upvoteOrDownvoteBlog: (_, args, { loggedInUser }) => {
      return upvoteUnvoteBlogInDB(args.input, loggedInUser.userId);
    },
    addCommentToBlog: (_, args, { loggedInUser }) => {
      return addCommentToBlog(args.input, loggedInUser.userId);
    },
    upvoteUnvoteComment: (_, args, { loggedInUser }) => {
      return upvoteUnvoteCommentInDB(args.input, loggedInUser.userId);
    },
    deleteComment: (_, args, { loggedInUser }) => {
      return deleteCommentFromBlogInDB(args.input, loggedInUser.userId);
    },
  },
};

module.exports = { blogResolvers };
