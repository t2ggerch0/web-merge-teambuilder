const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const Class = require("../../models/Class");
const verifyJwt = require("../../utils/verifyJwt");

router.get("/", async (req, res) => {
  try {
    const { classId } = req.query;

    // find class with classID
    const targetClass = await Class.findById(classId);
    res.status(201).json({ class: targetClass, code: 1 });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
