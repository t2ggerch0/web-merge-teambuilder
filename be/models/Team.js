const mongoos = require("mongoose");
const { Schema } = mongoos;

const teamSchema = new Schema({
  name: {
    type: String,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoos.model("Team", teamSchema);