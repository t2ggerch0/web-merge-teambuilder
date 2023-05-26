const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const Class = require("../../models/Class");
const Answer = require("../../models/Answer");
const verifyJwt = require("../../utils/verifyJwt");
const verifyClassId = require("../../utils/verifyClassId");

router.post("/verify-access-key", verifyJwt, async (req, res) => {
  try {
    //------ Verify User ------//
    // Verify JWT
    const userId = req.userId;
    // get User
    const user = await User.findById(userId);
    // get classId
    const classId = req.body.classId;
    // check if classId is valid
    const targetClass = await verifyClassId(classId);

    // check if class requires access key
    if (targetClass.isSecret) {
      // check if access key is valid
      const accessKey = req.body.accessKey;
      if (accessKey !== targetClass.accessKey) {
        return res.status(403).json({ message: "Invalid access key" });
      } else {
        // add user to hasAccess
        if (!targetClass.hasAccess.includes(userId)) {
          targetClass.hasAccess.push(userId);
        }
      }
    } else {
      return res.status(403).json({ message: "Class does not require access key" });
    }

    // Save targetClass to the database
    await targetClass.save();

    // Send a success response
    res.status(201).json({ message: "access key verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while verifying access key" });
  }
});

module.exports = router;

// example
/*
{
    "classId": "60b9b0b9b3b3b3b3b3b3b3b3",
    "accessKey": "123456",
}
*/
