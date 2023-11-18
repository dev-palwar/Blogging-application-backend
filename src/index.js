const dotenv = require("dotenv");
const path = require("path");

const connectDatabase = require(path.resolve(__dirname, "../Database/config.js"));
const graphqlInit = require(path.resolve(__dirname, "../GraphQl/server"));


// initializes enviorment variables
dotenv.config();

// initializes the GraphQl server
graphqlInit();

// Connects the MongoDb
connectDatabase();
