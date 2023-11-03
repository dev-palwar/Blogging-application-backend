const {
  authenticateUser,
  createUserInDB,
  followUnfollowUserInDB,
} = require("../../../Database/Controllers/users");
const { sayHello } = require("../../../lib/temp");

const userResolvers = {
  Query: {
    login: async (_, args) => {
      const { email, password } = args.input;
      return authenticateUser(email, password);
    },
    hello: (parent, args, { loggedInUser }, info) => {
      return sayHello(loggedInUser);
    },
  },

  Mutation: {
    signUp: (_, args) => {
      const { input } = args;
      return createUserInDB(input);
    },
    followUnfollowUser: (_, args, { loggedInUser }) => {
      return followUnfollowUserInDB(args.id, loggedInUser.userId)
    },
  },
};

module.exports = { userResolvers };
