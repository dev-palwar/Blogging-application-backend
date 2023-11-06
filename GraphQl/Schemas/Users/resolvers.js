const {
  authenticateUser,
  createUserInDB,
  followUnfollowUserInDB,
} = require("../../../Database/Controllers/users");
const { sayHello } = require("../../../lib/temp");

const userResolvers = {
  Query: {
    hello: () => {
      return "Hello client this is for you";
    },
  },

  Mutation: {
    login: async (_, args) => {
      try {
        const { email, password } = args.input;
        const { token, user } = await authenticateUser(email, password);
        return { token, user };
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    },
    signUp: (_, args) => {
      const { input } = args;
      return createUserInDB(input);
    },
    followUnfollowUser: (_, args, { loggedInUser }) => {
      return followUnfollowUserInDB(args.id, loggedInUser.userId);
    },
  },
};

module.exports = { userResolvers };
