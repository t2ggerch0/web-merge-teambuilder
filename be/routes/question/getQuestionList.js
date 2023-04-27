const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

router.get("/list", async (req, res) => {
  try {
    const { classId } = req.query;

    // find class with classID
    const targetClass = await Class.findById(classId).populate("questions");
    res.status(200).json({ questions: targetClass.questions });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
