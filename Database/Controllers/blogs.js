const { Blog } = require("../../Models/Blogs");

async function getBlogById(id) {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (error) {
    throw new Error(`Failed to fetch blog with ID ${id}: ${error.message}`);
  }
}

module.exports = { getBlogById };
