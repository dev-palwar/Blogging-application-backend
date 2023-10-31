const { getBlogById } = require("../../../Database/Controllers/blogs");
const Blog = require("../../../Database/Controllers/blogs");

const blogResolvers = {
  Query: {
    findBlog: (_, args, context) => {
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
