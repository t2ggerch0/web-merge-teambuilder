// index.js
require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("../models/Question");

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.log("MongoDB connection error:", error));

// create a new user
const newQuestion = new Question({
  name: "Your age",
  type: "custom",
  options: ["12", "13", "14"],
});

newQuestion
  .save()
  .then(() => console.log("User created successfully"))
  .catch((error) => console.log("Error creating user:", error));

// find all users
Question.find()
  .then((users) => console.log("All Questions:", Questions))
  .catch((error) => console.log("Error finding users:", error));

// get question data
const getQuestionData = () => {};

// post question data
const postQuestionData = () => {};
