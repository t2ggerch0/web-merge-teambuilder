const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");
const Class = require("../../models/Class");
const verifyJwt = require("../../utils/verifyJwt");

router.get("/", async (req, res) => {
  try {
    // get class IDs
    let { classId } = req.query;
    let targetClass = await Class.findById(classId);

    res.status(201).json({ targetClass });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
