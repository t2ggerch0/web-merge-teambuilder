const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const Class = require("../../models/Class");
const Question = require("../../models/Question");
const verifyJwt = require("../../utils/verifyJwt");

router.post("/add-custom-questions", verifyJwt, async (req, res) => {
  try {
    // verify JWT
    const userId = req.userId;

    // Check if the user is a professor
    const user = await User.findById(userId);
    if (user.userType !== "professor") {
      return res.status(403).json({ message: "Only professors can add questions" });
    }

    // verify if classid equals to classid in database
    const classId = req.body.classId;
    if ((await Class.findById(classId)) === null) {
      return res.status(403).json({ message: "Class ID not found" });
    }

    // get selected Class
    const selectedClass = await Class.findById(classId);

    // get question data for each question
    const questions = req.body.questions;

    // add each question to class or override if it already exists
    for (let i = 0; i < questions.length; i++) {
      const questionData = questions[i];

      // If the question does not exist, add it to the selectedClass.questions array
      const newQuestion = new Question({
        title: questionData.title,
        type: questionData.type,
        options: questionData.options,
        isMandatory: questionData.isMandatory,
        weight: questionData.weight,
        scoringType: questionData.scoringType,
        countScore: questionData.countScore,
      });
      await newQuestion.save((err) => console.log('question save error'));
      selectedClass.questions.push(newQuestion);
    }

    await selectedClass.save().catch((err) => console.log('class save error'));

    // Send a success response
    res.status(201).json({ message: "Added Question Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the class" });
  }
});

module.exports = router;

// example
/*
{
  "classId": "643571a8ac64948d180116d0",
  "questions": [
    {
      "title": "Which project do you want?",
      "type": "custom",
      "options": ["AI", "non-AI"],
      "isMandatory": true,
    },
    {
      "title": "What is your interest?",
      "type": "custom",
      "options": ["Network", "Security", "System"],
      "isMandatory": false,
      "weight": 5,
      "scoringType": "single",
      "countScore": "different"
    }
  ]
}
*/
