const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const Class = require("../../models/Class");
const verifyJwt = require("../../utils/verifyJwt");
const verifyClassId = require("../../utils/verifyClassId");

router.post("/join-class", verifyJwt, async (req, res) => {
  try {
    // Verify JWT
    const userId = req.userId;

    // get User
    const user = await User.findById(userId);

    // get class id
    const accessKey = req.body.accessKey;

    let targetClass = await Class.findOne({ accessKey: accessKey });
    if (!targetClass) {
      return res.status(403).json({ message: "Class not found" });
    }
 
    let classId = targetClass._id;
    // check if user is already in class
    if (user.classes.includes(classId)) {
      return res.status(403).json({ message: "User is already in class" });
    }

    // check class capacity
    if (targetClass.capacity <= targetClass.students.length) {
      return res.status(403).json({ message: "Class is full" });
    }

    // check if class adding question is ended
    if (!targetClass.endQuestion) {
      return res.status(403).json({ message: "Class is still on creation" });
    }

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
