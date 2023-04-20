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
  capacity: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoos.model("Class", classSchema);
