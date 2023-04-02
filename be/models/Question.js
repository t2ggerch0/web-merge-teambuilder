const mongoose = require("mongoose");

// Define Question schema
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["default", "custom"],
  },
  options: {
    type: [String],
    default: [],
  },
  isMandatory: {
    type: Boolean,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

// export Question model
module.exports = Question;
