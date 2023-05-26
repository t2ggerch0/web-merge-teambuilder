const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const Class = require("../../models/Class");

router.get("/all", async (req, res) => {
  try {
    // get all classes
    const classes = await Class.find({});
    res.status(201).json({ classes });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
