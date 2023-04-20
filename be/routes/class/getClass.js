const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');

const Class = require("../../models/Class");

router.get("/", async (req, res) => {
  try {
    const { classId } = req.query;

    // find class with classID
    const targetClass = await Class.findOne({ _id: mongoose.Types.ObjectId(classId) });
    res.status(201).json({ class: targetClass, code: 1 });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
