const dotenv = require("dotenv");
const connectDatabase = require("./Database/config");
const graphqlInit = require("./GraphQl/server");

// initializes enviorment variables
dotenv.config();

// Connects the MongoDb
connectDatabase();

// initializes the GraphQl server
graphqlInit();
