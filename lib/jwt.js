const jwt = require("jsonwebtoken");

const generateJwtToken = async (user) => {
  const token = await jwt.sign(
    { userId: user._id, name: user.name, avatar: user.avatar },
    process.env.JWT_TOKEN
  );
  return token;
};

module.exports = { generateJwtToken };
