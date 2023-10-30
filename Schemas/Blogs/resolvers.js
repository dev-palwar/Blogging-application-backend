const { getBlogById } = require("../../Database/Controllers/blogs");
const { Blog } = require("../../Models/Blogs");

const blogResolvers = {
  Query: {
    findBlog: (_, args) => {
      return getBlogById(args.id);
    },
  },
  Mutation: {
    createBlog: (_, args) => {
      Blog.create(args.input);
      return args.input;
    },
  },
};

module.exports = { blogResolvers };
