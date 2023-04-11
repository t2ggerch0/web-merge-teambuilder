const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const Question = require("../../models/Question");

router.post("/create-question", async (req, res) => {
  try {
    const questionData = req.body;
    const newQuestion = new Question({
      title: questionData.title,
      type: questionData.type,
      options: questionData.options,
      isMandatory: questionData.isMandatory,
      weight: questionData.weight,
      scoringType: questionData.scoringType,
      countScore: questionData.countScore,
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the question" });
  }
});

module.exports = router;

// example
/*
{
    "title":"apple vs banana",
    "type" : "default",
    "options":["apple", "banana"],
    "isMandatory":false,
    "weight":5,
    "scoringType":"single",
    "countScore":"same"
}
*/
