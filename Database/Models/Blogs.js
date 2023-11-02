const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the blog"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for the blog"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  tags: [],
  upvotes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      comment: {
        type: String,
      },
      upvotes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
