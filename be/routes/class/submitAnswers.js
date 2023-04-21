const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const Answer = require("../../models/Answer");
const verifyJwt = require("../../utils/verifyJWT");
const VerifyUserType = require("../../utils/verifyUserType");
const VerifyClassId = require("../../utils/verifyClassId");

router.post("/submit-answers", async (req, res) => {
  try {
    // verify JWT
    const userId = verifyJwt(req, res);

    // Check if the user is a student
    VerifyUserType(userId, "student");

    // verify if classid equals to classid in database
    const classId = req.body.classId;
    const selectedClass = await VerifyClassId(classId);

    // Get the question ids from the request body
    const questionIds = req.body.questionIds;

    // Get the answers for the questions
    const answers = questionIds.map((questionId) => {
      const answer = {
        student: userId,
        question: questionId,
        answer: req.body[questionId],
      };
      return answer;
    });

    // Save the answers to the database
    const savedAnswers = await Answer.insertMany(answers);

    // Update the class document with the new answers
    selectedClass.answers.push(...savedAnswers.map((answer) => answer._id));
    await selectedClass.save();
  } catch {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occured while submitting answers" });
  }
});

// example
/*
{
  "classId": "<class_id>",
  "questionIds": ["<question_id_1>", "<question_id_2>", "<question_id_3>"],
  "<question_id_1>": ["<answer_1>", "<answer_2>", "<answer_3>"],
  "<question_id_2>": ["<answer_1>", "<answer_2>"],
  "<question_id_3>": ["<answer_1>"]
}
*/
