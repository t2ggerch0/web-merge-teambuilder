const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  guest: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      answer: {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
    },
  ],
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  questionIds: [
    {
      type: Number,
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
    type: String,
    required: false,
  },
  hasAccess: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Class", classSchema);
