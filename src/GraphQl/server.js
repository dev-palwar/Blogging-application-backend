const { ApolloServer } = require("apollo-server");
const { userTypeDefs } = require("../GraphQl/Schemas/User/type-defs");
const { userResolvers } = require("../GraphQl/Schemas/User/resolvers");
const { blogTypeDef } = require("../GraphQl/Schemas/Blog/type-defs");
const { blogResolvers } = require("../GraphQl/Schemas/Blog/resolvers");
const { context } = require("./Middleware/context");

const graphqlInit = () => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, blogTypeDef],
    resolvers: [userResolvers, blogResolvers],
    context: context,
  });

  server.listen().then(({ url }) => {
    console.log("Server is all set");
  });
};

module.exports = graphqlInit;
