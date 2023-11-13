const jwt = require("jsonwebtoken");

const tokenBlacklist = new Set();

const context = ({ req }) => {
  const token = req.headers.authorization || "";

  const logout = () => {
    // Adds the token to the blacklist
    tokenBlacklist.add(token);
  };

  try {
    if (token && !tokenBlacklist.has(token)) {
      const loggedInUser = jwt.verify(token, process.env.JWT_TOKEN);
      return { loggedInUser, logout };
    }
    return { logout };
  } catch (error) {
    throw new Error("Authentication error. Please log in again.");
  }
};

module.exports = { context };
