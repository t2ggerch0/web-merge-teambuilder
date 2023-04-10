const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");

router.get("/users", async (req, res) => {
  try {
    // Check if user exists
    const users = await User.find({});
    res.json(users);
    if (!user) {
      return res.status(401).json({ code: 0, message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
