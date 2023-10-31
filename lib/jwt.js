const jwt = require("jsonwebtoken");

const genrateJwtToken = async (user) => {
  const token = await jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_TOKEN
  );
  return token;
};

module.exports = { genrateJwtToken };
