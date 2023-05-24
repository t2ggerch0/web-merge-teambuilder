const mongoos = require("mongoose");
const { Schema } = mongoos;

const teamSchema = new Schema({
  name: {
    type: String,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chat: [
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoos.model("Team", teamSchema);
