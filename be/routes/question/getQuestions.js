const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Class = require("../../models/Class");

router.get("/", async (req, res) => {
  try {
    const { classId } = req.query;

    // find class with classID
    const targetClass = await Class.findById(classId).populate({
      path: "questions",
      model: "Question"
    });
    res.status(200).json({ questions: targetClass.questions });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
