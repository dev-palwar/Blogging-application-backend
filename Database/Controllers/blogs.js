const sendResponse = require("../../lib/response");
const Blog = require("../Models/Blogs");
const User = require("../Models/Users");

const findUsersBlog = async (blogId, loggedInUser) => {
  const blog = await Blog.findOne({ _id: blogId, Author: loggedInUser });
  return blog;
};

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
    const { poster, title, description, tags, category } = blogObject;
    const resFromDB = new Blog({
      poster,
      title,
      description,
      Author: loggedInUser,
      tags,
      category,
    });
    const user = await User.findById(loggedInUser);
    user.blogs.push(resFromDB._id);
    await user.save();
    await resFromDB.save();
    return resFromDB;
  } catch (error) {
    throw new Error(`Error adding blog to the database:: ${error.message}`);
  }
}

async function updateBlogUpvotesInDB(blogId, loggedInUser) {
  const blog = await findBlogInDB(blogId);
  if (!blog) throw new Error("Blog not found");

  try {
    const userLiked = blog.upvotes.find(
      (vote) => String(vote.user) === loggedInUser
    );

    if (!userLiked) {
      blog.upvotes.push({ user: loggedInUser });
      await blog.save();
      return sendResponse("blog upvoted", true);
    } else {
      blog.upvotes = blog.upvotes.filter(
        (vote) => String(vote.user) !== loggedInUser
      );
      await blog.save();
      return sendResponse("blog upvote revoked", true);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCommentToBlogInDB({ blogId, comment }, loggedInUser) {
  try {
    let blog = await findBlogInDB(blogId);
    blog.comments.push({ comment, user: loggedInUser });
    await blog.save();
    return sendResponse("Comment added", true);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function upvoteCommentInDB({ blogId, commentId }, loggedInUser) {
  try {
    const blog = await findBlogInDB(blogId);

    const comment = blog.comments.id(commentId);
    if (!comment) return sendResponse("Comment not found", false);

    const upvotesArray = comment.upvotes.map((upvote) =>
      upvote.user.toString()
    );

    const userIndex = upvotesArray.indexOf(loggedInUser.toString());

    if (userIndex !== -1) {
      comment.upvotes.splice(userIndex, 1);
      await blog.save();
      return sendResponse("Comment upvote revoked", true);
    } else {
      comment.upvotes.push({ user: loggedInUser });
      await blog.save();
      return sendResponse("Comment upvoted", true);
    }
  } catch (error) {
    return sendResponse("Internal server error", false);
  }
}

async function deleteCommentFromBlogInDB({ blogId, commentId }, loggedInUser) {
  try {
    const blog = await findUsersBlog(blogId, loggedInUser);

    const comment = blog.comments.id(commentId);
    if (!comment) return sendResponse("Comment not found", false);

    blog.comments.splice(comment, 1);
    await blog.save();
    return sendResponse("Comment deleted", true);
  } catch (error) {
    return sendResponse("Blog not found", false);
  }
}

async function deleteBlogFromDB(blogId, loggedInUser) {
  try {
    const result = await Blog.deleteOne({ _id: blogId, Author: loggedInUser });
    if (result.deletedCount === 0) {
      return sendResponse("Blog not found", false);
    }
    return sendResponse("Blog deleted", true);
  } catch (error) {
    return sendResponse("Internal server error", false);
  }
}

module.exports = {
  findBlogInDB,
  createBlogInDB,
  updateBlogUpvotesInDB,
  addCommentToBlogInDB,
  upvoteCommentInDB,
  deleteCommentFromBlogInDB,
  deleteBlogFromDB,
};
