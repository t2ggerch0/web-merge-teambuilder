const express = require("express");
const router = express.Router();

const verifyJwt = require("../../utils/verifyJwt");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");
const Class = require("../../models/Class");
const Question = require("../../models/Question");
const verifyUserType = require("../../utils/verifyUserType");
const verifyClassId = require("../../utils/verifyClassId");
const defaultQuestionList = require("../../data/DefaultQuestionLists.json").questions;

router.post("/end-answer", verifyJwt, async (req, res) => {
  try {
    // verify JWT
    const userId = req.userId;

    // check if user is professor, return user if true
    await verifyUserType(userId, "professor");

    // verify class id
    const targetClass = await verifyClassId(req.body.classId);

    // check if user is professor of class
    if (targetClass.professor.toString() !== userId) {
      return res.status(403).json({ message: "User is not professor of class" });
    }

    // check student length match with answer length
    if (targetClass.students.length !== targetClass.answers.length) {
      return res.status(403).json({ message: "Student length is not equal to answer length" });
    }

    // set endQuestion to true
    targetClass.endAnswer = true;
    await targetClass.save();

    // Send a success response
    res.status(201).json({ message: "Added Answer Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
