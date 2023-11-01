const {
  authenticateUser,
  createUser,
} = require("../../../Database/Controllers/users");
const { sayHello } = require("../../../lib/temp");

const userResolvers = {
  Query: {
    login: async (_, args) => {
      const { email, password } = args.input;
      return authenticateUser(email, password);
    },
    hello: (parent, args, { loggedInUser }) => {
      return sayHello(loggedInUser);
    },
  },

  Mutation: {
    signUp: async (_, args) => {
      const { input } = args;
      return createUser(input);
    },
  },
};

module.exports = { userResolvers };
