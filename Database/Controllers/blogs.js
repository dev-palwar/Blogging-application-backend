const Blog = require("../Models/Blogs");

async function findBlogInDB(id) {
  try {
    const resFromDB = await Blog.findById(id);
    if (!resFromDB) {
      throw new Error("Blog not found");
    }
    return resFromDB;
  } catch (error) {
    throw new Error(`Failed to fetch blog with ID ${id}: ${error.message}`);
  }
}

async function createBlogInDB(blogObject, loggedInUser) {
  try {
    const { title, description } = blogObject;
    const resFromDB = new Blog({ title, description, Author: loggedInUser });
    await resFromDB.save();
    return resFromDB;
  } catch (error) {
    throw new Error(`Error adding blog to the database:: ${error.message}`);
  }
}

async function updateUpvotesBlogInDB(blogId, loggedInUser) {
  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) throw new Error("Blog not found");

  try {
    const userLiked = blog.upvotes.find(
      (vote) => String(vote.user) === loggedInUser
    );

    if (!userLiked) {
      blog.upvotes.push({ user: loggedInUser });
      await blog.save();
      return "blog upvoted";
    } else {
      blog.upvotes = blog.upvotes.filter(
        (vote) => String(vote.user) !== loggedInUser
      );
      await blog.save();
      return "blog upvote revoked";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteBlogFromDB(blogId, loggedInUser) {
  try {
    const blog = await Blog.findOne({ _id: blogId, Author: loggedInUser });
    if (!blog) {
      throw new Error(
        "Blog not found or user is not authorized to delete this blog"
      );
    }
    const deletedBlog = await blog.remove();
    return "deleted";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  findBlogInDB,
  createBlogInDB,
  deleteBlogFromDB,
  updateUpvotesBlogInDB,
};
