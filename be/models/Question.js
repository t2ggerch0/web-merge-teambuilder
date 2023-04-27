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
  weight: {
    type: Number,
    required: true,
    default: 5,
  },
  scoringType: {
    type: String,
    required: true,
    enum: ["single", "multi", "points"],
    default: "single",
  },
  countScore: {
    type: String,
    required: true,
    enum: ["same", "different"],
    default: "same",
  },
  // capacity: {
  //   type: Number,
  //   required: true,
  // },

  // 필요(?)
  // startDate: {
  //   type: Date,
  //   required: true,
  // },
  // endDate: {
  //   type: Date,
  //   required: true,
  // },
});

const Question = mongoose.model("Question", questionSchema);

// export Question model
module.exports = Question;
