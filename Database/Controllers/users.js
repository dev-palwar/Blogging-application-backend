const { generateJwtToken } = require("../../lib/jwt");
const sendResponse = require("../../lib/response");
const User = require("../Models/Users");
const Blogs = require("../Models/Blogs");
const bcrypt = require("bcrypt");

const userFromDB = async (loggedInUser) => {
  const user = await User.findOne({ _id: loggedInUser });
  if (!user) throw new Error("No user found with this email");
  return user;
};

async function createUserInDB(params) {
  const response = await User.findOne({ email: params.email });

  if (response) throw new Error("User already exists");

  try {
    const hashedPassword = await bcrypt.hash(params.password, 10);
    const resFromDB = await User.create({
      name: params.name,
      email: params.email,
      bio: params.bio,
      avatar: params.avatar,
      nationality: params.nationality,
      password: hashedPassword,
    });
    return resFromDB;
  } catch (error) {
    throw new Error(error.message);
  }
}

const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No user found with this email");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Incorrect password or email");

    // Generating JWT token
    const token = await generateJwtToken(user);
    return { token, user };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

async function followUnfollowUserInDB(userToBeFollowed, loggedInUser) {
  try {
    const user = await User.findOne({ _id: loggedInUser });
    const user2 = await User.findOne({ _id: userToBeFollowed });

    const index = user.following.findIndex(
      (item) => item._id.toString() === userToBeFollowed
    );

    if (index == -1) {
      user.following.push(user2);
      user2.followers.push(user);
      await user.save();
      await user2.save();
      return true;
    } else {
      user.following.splice(index, 1);
      user2.followers.splice(index, 1);
      await user.save();
      await user2.save();
      return false;
    }
  } catch (error) {
    throw new Error("User not found");
  }
}

const getUsersBlogsFromDB = async (loggedInUser) => {
  try {
    const blogs = await Blogs.find({
      Author: loggedInUser.toString(),
    }).populate("Author");
    return blogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProfileFromDB = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId })
      .populate({
        path: "blogs",
        populate: [
          { path: "Author" },
          { path: "upvotes.user" },
          { path: "comments.user" },
          { path: "comments.upvotes.user" },
        ],
      })
      .populate("following")
      .populate("followers");

    return user;
  } catch (error) {
    throw new Error("user not found" + error.message);
  }
};

module.exports = {
  getProfileFromDB,
  userFromDB,
  authenticateUser,
  createUserInDB,
  followUnfollowUserInDB,
  getUsersBlogsFromDB,
};
