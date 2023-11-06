const { generateJwtToken } = require("../../lib/jwt");
const sendResponse = require("../../lib/response");
const User = require("../Models/Users");
const bcrypt = require("bcrypt");

async function createUserInDB(params) {
  const response = await User.findOne({ email: params.email });

  if (response) return "User already exists";

  try {
    const hashedPassword = await bcrypt.hash(params.password, 10);
    const resFromDB = await User.create({
      name: params.name,
      email: params.email,
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
    if (!user) {
      throw new Error('No user found with this email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Incorrect password or email');
    }

    // Generating JWT token
    const token = await generateJwtToken(user);
    return { token, user };
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
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
      user.following.push(user2._id);
      user2.followers.push(user._id);
      await user.save();
      await user2.save();
      return sendResponse("User followed", true);
    } else {
      user.following.splice(index, 1);
      user2.followers.splice(index, 1);
      await user.save();
      await user2.save();
      return sendResponse("User unfollowed", true);
    }
  } catch (error) {
    throw new Error("User not found");
  }
}

module.exports = { authenticateUser, createUserInDB, followUnfollowUserInDB };
