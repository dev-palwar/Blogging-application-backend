const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/user");
const { generateJwtToken } = require("../../Lib/jwt");

const getProfileFromDB = async (userId) => {
  try {
    const user = await User.findById(userId)
      .populate({
        path: "blogs",
        select: "title description poster category createdAt",
        populate: {
          path: "upvotes",
          select: "name email avatar createdAt",
        },
        populate: {
          path: "author",
          select: "name avatar createdAt",
        },
      })
      .populate("followers", "name email avatar")
      .populate("following", "name email avatar");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error.message);
    throw error;
  }
};

const createUserInDB = async (userData) => {
  try {
    // Checks if the user with the provided email already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) throw new Error("User with the provided email already exists");

    // Hashes the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      bio: userData.bio,
      avatar: userData.avatar,
      nationality: userData.nationality,
    });

    await newUser.save();
    return true;
  } catch (error) {
    throw error;
  }
};

const authenticateUser = async (email, password) => {
  try {
    // Finds the user with the provided email
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    // Compares the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Either email or password is invalid");

    // Generates a JWT token
    const token = await generateJwtToken(user);

    // Returns the token and user information
    return { token, user };
  } catch (error) {
    console.error("Authentication error:", error.message);
    throw error;
  }
};

const followUnfollowUserInDB = async (followingId, followerId) => {
  try {
    // Checks if the follower and following users exist
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) throw new Error("Follower or following user not found");

    // Checks if the follower is already following the user
    const isAlreadyFollowing = follower.following.includes(followingId);

    if (isAlreadyFollowing) {
      // If already following, unfollows
      follower.following.pull(followingId);
      following.followers.pull(followerId);

      // Saves the changes to the database
      await Promise.all([follower.save(), following.save()]);

      return false; // Returns false when unfollowed
    } else {
      // If not following, follows
      follower.following.push(followingId);
      following.followers.push(followerId);

      // Saves the changes to the database
      await Promise.all([follower.save(), following.save()]);
      return true; // Returns true when followed
    }
  } catch (error) {
    console.error("Error following/unfollowing user:", error.message);
    throw error;
  }
};

module.exports = {
  createUserInDB,
  authenticateUser,
  followUnfollowUserInDB,
  getProfileFromDB,
};
