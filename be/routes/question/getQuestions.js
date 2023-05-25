const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Class = require("../../models/Class");
const questionLists = require("../../data/questionsList");

router.get("/", async (req, res) => {
  try {
    const { classId } = req.query;

    // find class with classID
    const targetClass = await Class.findById(classId);
    
    // 질문 리스트 필터링
    let filteredQuestions = questionLists.filter(question => targetClass.questionIds.includes(question.id));

    res.status(200).json({ filteredQuestions });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
