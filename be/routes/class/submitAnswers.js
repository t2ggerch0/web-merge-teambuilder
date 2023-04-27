const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const Answer = require("../../models/Answer");
const verifyUserType = require("../../utils/verifyUserType");
const verifyClassId = require("../../utils/verifyClassId");
const verifyJwt = require("../../utils/verifyJwt");

router.post("/submit-answers", verifyJwt, async (req, res) => {
  try {
    // Verify JWT
    const userId = req.userId;

    // Check if the user is a student
    await verifyUserType(userId, "student");

    // verify if classid equals to classid in database
    const classId = req.body.classId;
    const selectedClass = await verifyClassId(classId);

    // check if end question is true
    if (!selectedClass.endQuestion) {
      return res.status(403).json({ message: "Question is not ended" });
    }

    // Get the question ids from the request body
    const questionIds = req.body.questionIds;

    // check if questionIds length equals to questionIds length in database
    if (questionIds.length !== selectedClass.questions.length) {
      return res.status(403).json({ message: "Question length is not equal" });
    }

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
    res.status(500).send({ message: "An error occured while submitting answers" });
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

module.exports = router;