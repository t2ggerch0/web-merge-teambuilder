const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Question = require("../../models/Question");
const verifyClassId = require("../../utils/verifyClassId");

router.get("/", async (req, res) => {
  try {
    const { classId } = req.query;
    const targetClass = await verifyClassId(classId);

    // find questions of the class
    const questions = await targetClass.questions;

    res.status(201).json({ questions });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
