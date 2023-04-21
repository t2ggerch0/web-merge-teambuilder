const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Class = require("../../models/Class");

router.get("/", async (req, res) => {
  try {
    const { classId } = req.query;

    // find class with classID
    const targetClass = await Class.findOne({ _id: classId });
    res.status(201).json({ targetClass });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
