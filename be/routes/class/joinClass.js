const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const Class = require("../../models/Class");
const Answer = require("../../models/Answer");
const verifyJwt = require("../../utils/verifyJwt");
const verifyClassId = require("../../utils/verifyClassId");

router.post("/join-class", verifyJwt, async (req, res) => {
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
      }
    }

    // check if user is already in class
    if (user.classes.includes(targetClass._id)) {
      return res.status(403).json({ message: "User is already in class" });
    } else if (targetClass.members.includes(userId)) {
      return res.status(403).json({ message: "User is already in class" });
    }

    //------ Verify position ------//
    // check if position is valid
    const position = req.body.position;
    if (!targetClass.positionTypes.includes(position)) {
      return res.status(403).json({ message: "Invalid position" });
    }
    // update position counts
    const positionIndex = targetClass.positionTypes.indexOf(position);
    targetClass.positionCounts[positionIndex] += 1;

    //------ Verify answers ------//
    // get user answers to questions
    const answers = req.body.answers;

    // check if answers are valid
    if (answers.length !== targetClass.questions.length) {
      return res.status(403).json({ message: "Invalid answer length" });
    }

    // add answers to class
    const answerChoices = [];
    for (let i = 0; i < answers.length; i++) {
      answerChoices.push(answers[i].answer);
    }

    const answerObject = new Answer({
      member: userId,
      answer: answerChoices,
    });
    targetClass.answers.push(answerObject);

    // Add the user to the class's list of members
    if (!targetClass.members.includes(userId)) {
      targetClass.members.push(userId);
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

// example
/*
{
    "classId": "60b9b0b9b3b3b3b3b3b3b3b3",
    "accessKey": "123456",
    "position" : "frontend",
    "answers": [
        {
            "questionId": "0",
            "answer": 2
        },
        {
            "questionId": "1",
            "answer": 1
        },
        {
            "questionId": "2",
            "answer": [0,3,19]
        },
        {
            "questionId": "3",
            "answer": 0
        },
    ],
}
*/
