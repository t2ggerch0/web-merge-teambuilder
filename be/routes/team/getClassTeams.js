const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Class = require("../../models/Class");

router.get("/classTeams", async (req, res) => {
  try {
    // get class IDs
    let { classId } = req.query;
    let targetClass = await Class.findById(classId).populate("teams");
    let teams = targetClass.teams;

    res.status(201).json({ teams });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
