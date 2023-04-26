const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const Class = require("../../models/Class");
const verifyJwt = require("../../utils/verifyJwt");

router.post("/join-class", verifyJwt, async (req, res) => {
  try {
    // Verify JWT
    const userId = req.userId;

    // get User
    const user = await User.findById(userId);

    // get class id
    const classId = req.body.classId;

    // find class with classID
    const targetClass = await Class.findById(classId);

    // add user to class
    if (user.userType === "professor") {
      // when there are multi professors
      if (!targetClass.professor.includes(userId)) {
        targetClass.professor.push(userId);
      }
    } else {
      if (!targetClass.students.includes(userId)) {
        targetClass.students.push(userId);
      }
    }

    // Save targetClass to the database
    await targetClass.save();

    // Add the new class to the user's list of classes
    if (!user.classes.includes(classId)) {
      user.classes.push(classId);
    }
    await user.save();

    // Send a success response
    res.status(201).json({ message: "joined class successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while joining the class" });
  }
});

module.exports = router;