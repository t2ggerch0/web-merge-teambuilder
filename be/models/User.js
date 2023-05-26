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
    positionIndexByClass: [
      {
        class: {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
        positionIndex: {
          type: Number,
        },
      },
    ],
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoos.model("User", userSchema);
