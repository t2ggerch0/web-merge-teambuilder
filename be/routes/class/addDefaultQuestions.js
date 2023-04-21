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
const defaultQuestionList =
  require("../../data/DefaultQuestionLists.json").questions;

router.post("/add-default-questions", verifyJwt, async (req, res) => {
  try {
    // verify JWT
    const userId = req.userId;

    // check if user is professor, return user if true
    verifyUserType(userId, "professor");

    // verify if classid equals to classid in database
    const classId = req.body.classId;
    if ((await Class.findById(classId)) === null) {
      return res.status(403).json({ message: "Class ID not found" });
    }

    // get selected Class
    const selectedClass = verifyClassId(classId);

    // get question indexes
    const questionIndexes = req.body.questionIndexes;

    // get weight for each questions
    const weights = req.body.weights;

    // get scoring types for each question
    const countScores = req.body.countScores;

    // check length of req.body are all same
    if (
      questionIndexes.length !== weights.length ||
      weights.length !== countScores.length
    ) {
      return res.status(403).json({
        message:
          "Length of questionIndex, weight, and countScores are not same",
      });
    }

    // add each question to class or override if it already exists
    for (let i = 0; i < questionIndexes.length; i++) {
      const questionData = defaultQuestionList[questionIndexes[i]];

      // If the question does not exist, add it to the selectedClass.questions array
      const newQuestion = new Question({
        id: questionData.id,
        title: questionData.title,
        type: questionData.type,
        options: questionData.options,
        isMandatory: questionData.isMandatory,
        weight: weights[i],
        scoringType: questionData.scoringType,
        countScore: countScores[i],
      });
      selectedClass.questions.push(newQuestion);
      await newQuestion.save();
    }

    await selectedClass.save().catch((err) => console.log(err));

    // Send a success response
    res.status(201).json({ message: "Added Question Successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the class" });
  }
});

module.exports = router;

// {
//     "classId": "643571a8ac64948d180116d0",
//     "questionIndexes" : [0,1,2,3,4],
//     "weights" : [3,3,3,4,5],
//     "countScores" : ["same","same","same","same","same"]
// }
