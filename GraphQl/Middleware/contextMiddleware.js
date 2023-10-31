const jwt = require("jsonwebtoken");

const contextMiddleware = ({ req }) => {
  const token = req.headers.authorization || "";
  try {
    if (token) {
      const loggedInUser = jwt.verify(token, process.env.JWT_TOKEN);
      return { loggedInUser };
    }
    return {};
  } catch (error) {
    throw new Error("Authentication error. Please log in again.");
  }
};

module.exports = { contextMiddleware };
