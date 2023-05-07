const mongoos = require("mongoose");
const { Schema } = mongoos;

const classSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  guest: [
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
  className: {
    type: String,
    required: true,
  },
  classDescription: {
    type: String,
    required: true,
  },
  classType: {
    // can be web / app / game
    type: String,
    required: true,
  },
  positionTypes: [
    {
      type: String,
      required: true,
    },
  ],
  positionComposition: [
    {
      type: Number,
      required: true,
    },
  ],
  positionCounts: [
    {
      type: Number,
    },
  ],
  recruitStartDate: {
    type: Date,
    required: true,
  },
  recruitEndDate: {
    type: Date,
    required: true,
  },
  activityStartDate: {
    type: Date,
    required: true,
  },
  activityEndDate: {
    type: Date,
    required: true,
  },
  isSecret: {
    type: Boolean,
    required: true,
    default: false,
  },
  isHostParticipating: {
    type: Boolean,
    required: true,
  },
  accessKey: {
    type: Number,
    required: false,
  },
});

module.exports = mongoos.model("Class", classSchema);
