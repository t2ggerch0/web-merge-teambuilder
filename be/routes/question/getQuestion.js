const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Question = require("../../models/Question");

router.get("/", async (req, res) => {
  try {
    const { questionId } = req.query;

    // find class with classID
    const targetQuestion = await Question.findOne({ _id: questionId });
    res.status(201).json({ targetQuestion });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
