const mongoose = require("mongoose");

// Define Question schema
const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    default: [],
  },
  isMandatory: {
    type: Boolean,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    default: 5,
  },
  countScore: {
    type: String,
    required: true,
    enum: ["same", "different"],
    default: "same",
  },
});

const Question = mongoose.model("Question", questionSchema);

// export Question model
module.exports = Question;
