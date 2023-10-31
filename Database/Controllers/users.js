const { genrateJwtToken } = require("../../lib/jwt");
const User = require("../Models/Users");
const bcrypt = require("bcrypt");

async function createUser(params) {
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
    return error.message;
  }
}

async function authenticateUser(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user found with this email");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password or email");
    }

    // Genrating JWT token
    const token = await genrateJwtToken(user);
    console.log(token);

    return user;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

module.exports = { authenticateUser, createUser };
