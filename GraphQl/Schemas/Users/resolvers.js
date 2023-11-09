const {
  authenticateUser,
  createUserInDB,
  followUnfollowUserInDB,
  getUsersBlogsFromDB,
  getProfileFromDB,
} = require("../../../Database/Controllers/users");

const userResolvers = {
  Query: {
    hello: () => {
      return "Hello client this is for you";
    },
    getUsersBlogs: (_, args, { loggedInUser }) => {
      return getUsersBlogsFromDB(loggedInUser.userId);
    },
    getProfile: async (_, args) => {
      const user = await getProfileFromDB(args.userId);
      return user;
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
