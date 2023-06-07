const mongoos = require("mongoose");
const { Schema } = mongoos;

const answerSchema = new Schema({
  // HACK
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
});

module.exports = mongoos.model("Answer", answerSchema);
