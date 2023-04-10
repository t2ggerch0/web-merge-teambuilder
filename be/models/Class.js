const mongoos = require("mongoose");
const { Schema } = mongoos;

const classSchema = new Schema({
  professor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  customQuestions: [
    {
      question: String,
      options: [
        {
          type: String,
        },
      ],
      priority: Number,
    },
  ],
});

module.exports = mongoos.model("Class", classSchema);
