const dotenv = require("dotenv");
const connectDatabase = require("./Database/Config");
const graphqlInit = require("./GraphQl/server");

// initializes enviorment variables
dotenv.config();

// Connects the MongoDb
connectDatabase();

// initializes the GraphQl server
graphqlInit();
