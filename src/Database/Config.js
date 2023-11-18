const mongoose = require("mongoose");

const connectDatbase = () => {
  module.exports = mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch((e) => console.log("Failed to connect to database"));
};

module.exports = connectDatbase;
