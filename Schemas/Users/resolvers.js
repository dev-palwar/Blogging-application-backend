const {
  authenticateUser,
  createUser,
} = require("../../Database/Controllers/users");

const userResolvers = {
  Query: {
    getUser: async (_, args) => {
      const { email, password } = args.input;
      return authenticateUser(email, password);
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const { input } = args;
      return createUser(input);
    },
  },
};

module.exports = { userResolvers };
