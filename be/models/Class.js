const mongoos = require("mongoose");
const { Schema } = mongoos;

const classSchema = new Schema({
  professor: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  name: {
    type: String,
    required: true,
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
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  capacity: {
    type: Number,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  endQuestion: {
    type: Boolean,
    default: false,
    required: false,
  },
  endAnswer: {
    type: Boolean,
    default: false,
    required: false,
  },
  accessKey: {
      type: Number,
      required: true
  },
});

module.exports = mongoos.model("Class", classSchema);
