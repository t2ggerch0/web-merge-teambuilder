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
});

// export Question model
module.exports = mongoos.model("Question", questionSchema);
