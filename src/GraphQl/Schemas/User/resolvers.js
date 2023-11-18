const {
  createUserInDB,
  authenticateUser,
  followUnfollowUserInDB,
  getProfileFromDB,
} = require("../../../Database/Controllers/user");

const userResolvers = {
  Query: {
    hello: () => {
      return "Ok";
    },
    getProfile: (_, args) => {
      return getProfileFromDB(args.input);
    },
    logout: (_, __, context) => {
      context.logout();
      return true;
    },
  },
  Mutation: {
    signUp: (_, args) => {
      const { input } = args;
      return createUserInDB(input);
    },
    login: (_, args) => {
      const { email, password } = args.input;
      return authenticateUser(email, password);
    },
    followUnfollowUser: (_, args, { loggedInUser }) => {
      return followUnfollowUserInDB(args.input, loggedInUser.userId);
    },
  },
};

module.exports = { userResolvers };
