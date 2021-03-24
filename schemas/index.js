const mongoose = require("mongoose");

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

module.exports = () => {
  const connect = () => {
    mongoose.connect(
      MONGO_URL,
      {
        dbName: "googleMaps",
      },
      (error) => {
        if (error) {
          console.error("MongoDB connection error", error);
        } else {
          console.log("MongoDB connected successfully");
        }
      }
    );
  };
  connect();

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB Connection Error", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("MongoDB is disconnected. Trying to reconnect.");
    connect();
  });

  require("./favorite");
  require("./history");
};
