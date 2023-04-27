const mongoose = require("mongoose");

const connectToMongoose = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log("Connecting");
      await mongoose.connect("mongodb://localhost/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to database");
      await mongoose.connection.once("open", () => {
        console.log("Connected to test database");
      });
    } else {
      console.log("Already connected to database");
    }
  } catch (error) {
    console.error(error);
  }
};

const disconnectFromMongoose = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectToMongoose, disconnectFromMongoose };
