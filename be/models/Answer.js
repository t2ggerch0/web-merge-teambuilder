const mongoos = require("mongoose");
const { Schema } = mongoos;

const answerSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoos.model("Answer", answerSchema);
