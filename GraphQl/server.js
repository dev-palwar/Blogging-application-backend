const { ApolloServer } = require("apollo-server");
const { userTypeDefs } = require("../GraphQl/Schemas/Users/type-defs");
const { userResolvers } = require("../GraphQl/Schemas/Users/resolvers");
const { blogTypeDef } = require("../GraphQl/Schemas/Blogs/type-defs");
const { blogResolvers } = require("../GraphQl/Schemas/Blogs/resolvers");
const { contextMiddleware } = require("./Middleware/contextMiddleware");

const graphqlInit = () => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, blogTypeDef],
    resolvers: [userResolvers, blogResolvers],
    context: contextMiddleware
  });

  server.listen().then(({ url }) => {
    console.log(`Server running smooth at: ${url}`);
  });
};

module.exports = graphqlInit;
