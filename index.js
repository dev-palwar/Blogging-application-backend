const { ApolloServer } = require("apollo-server");
const connectDatabase = require("./Database/Config");
const { userTypeDefs } = require("./Schemas/Users/type-defs");
const { userResolvers } = require("./Schemas/Users/resolvers");
const { blogTypeDef } = require("./Schemas/Blogs/type-defs");
const { blogResolvers } = require("./Schemas/Blogs/resolvers");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, blogTypeDef],
  resolvers: [userResolvers, blogResolvers],
});
connectDatabase();

server.listen().then(({ url }) => {
  console.log(`Server running smooth at: ${url}`);
});
