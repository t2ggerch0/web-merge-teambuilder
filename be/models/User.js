const mongoos = require("mongoose");
const { Schema } = mongoos;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifyCode: {
      type: Number,
      required: true,
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoos.model("User", userSchema);
