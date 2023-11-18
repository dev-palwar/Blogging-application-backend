const dotenv = require("dotenv");
const connectDatabase = require("../Database/config.js");
const graphqlInit = require("../GraphQl/server");

// initializes enviorment variables
dotenv.config();

// initializes the GraphQl server
graphqlInit();

// Connects the MongoDb
connectDatabase();