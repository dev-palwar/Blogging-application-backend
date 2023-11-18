const dotenv = require("dotenv");
const connectDatabase = require("../src/Database/Config");
const graphqlInit = require("../src/GraphQl/server");

// initializes enviorment variables
dotenv.config();

// initializes the GraphQl server
graphqlInit();

// Connects the MongoDb
connectDatabase();
