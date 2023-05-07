const mongoos = require("mongoose");
const { Schema } = mongoos;

const answerSchema = new Schema({
  guest: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: [
    {
      type: Number,
      required: true,
    },
  ],
});

module.exports = mongoos.model("Answer", answerSchema);
