const Blog = require("../Models/blog");
const User = require("../Models/user");

const createBlogInDB = async (blogData, loggedInUser) => {
  try {
    const newBlog = new Blog({
      title: blogData.title,
      description: blogData.description,
      poster: blogData.poster,
      category: blogData.category,
      author: loggedInUser, 
    });

    const savedBlog = await newBlog.save();

    // Updates the user's blog array
    await User.findByIdAndUpdate(loggedInUser, {
      $push: { blogs: savedBlog._id },
    });

    console.log("Blog post added successfully:", savedBlog);
    return savedBlog._id;
  } catch (error) {
    console.error("Error adding blog post:", error.message);
    throw error;
  }
};

const deleteBlogFromDB = async (blogId) => {
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) throw new Error("Blog not found");

    await Blog.findByIdAndRemove(blogId);

    await User.findByIdAndUpdate(blog.author, { $pull: { blogs: blogId } });

    return true;
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    throw error;
  }
};

const upvoteUnvoteBlogInDB = async (blogId, loggedInUser) => {
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) throw new Error("Blog not found");

    // Checks if the user has already upvoted the blog
    const isUpvoted = blog.upvotes.includes(loggedInUser);

    if (isUpvoted) {
      // If already upvoted, removes the user from the upvotes array (unupvote)
      blog.upvotes.pull(loggedInUser);
      await blog.save();
      return false;
    } else {
      // If not upvoted, adds the user to the upvotes array (upvote)
      blog.upvotes.push(loggedInUser);
      await blog.save();
      return true;
    }
  } catch (error) {
    console.error("Error toggling upvote:", error.message);
    throw error;
  }
};

const addCommentToBlog = async (commentInput, loggedInUser) => {
  try {
    const { comment, blogId } = commentInput;

    const blog = await Blog.findById(blogId);

    if (!blog) throw new Error("Blog not found");

    // Creates a new comment
    const newComment = {
      comment,
      author: loggedInUser, 
    };

    blog.comments.push(newComment);
    await blog.save();
    return true;
  } catch (error) {
    console.error("Error adding comment to the blog:", error.message);
    throw error;
  }
};

const upvoteUnvoteCommentInDB = async (commentId, loggedInUser) => {
  try {
    const blog = await Blog.findOne({ "comments._id": commentId });

    if (!blog) throw new Error("Blog not found");

    // Finds the comment by its ID within the found blog
    const foundComment = blog.comments.id(commentId);

    if (!foundComment) throw new Error("Comment not found");

    // Checks if the user has already upvoted the comment
    const isUpvoted = foundComment.upvotes.includes(loggedInUser);

    if (isUpvoted) {
      // If already upvoted, removes the user from the upvotes array (unupvote)
      foundComment.upvotes.pull(loggedInUser);
    } else {
      // If not upvoted, adds the user to the upvotes array (upvote)
      foundComment.upvotes.push(loggedInUser);
    }

    await blog.save();

    return !isUpvoted;
  } catch (error) {
    console.error("Error toggling comment upvote:", error.message);
    throw error;
  }
};

const deleteCommentFromBlogInDB = async (commentId, loggedInUser) => {
  try {
    const blog = await Blog.findOne({ "comments._id": commentId });

    if (!blog) throw new Error("Blog not found");

    blog.comments.pull(commentId);

    const updatedBlog = await blog.save();

    console.log("Comment deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    throw error;
  }
};

const getBlog = async (blogId) => {
  try {
    const blog = await Blog.findById(blogId)
      .populate("author", "name email avatar createdAt") 
      .populate("upvotes", "name email avatar createdAt"); 

    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (error) {
    console.error("Error getting blog by ID:", error.message);
    throw error;
  }
};

module.exports = {
  getBlog,
  createBlogInDB,
  deleteBlogFromDB,
  upvoteUnvoteBlogInDB,
  addCommentToBlog,
  upvoteUnvoteCommentInDB,
  deleteCommentFromBlogInDB,
};
