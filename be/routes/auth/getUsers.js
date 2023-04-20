const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const verifyJwt = require("../../utils/verifyJwt");

const User = require("../../models/User");

router.get("/user", verifyJwt, async (req, res) => {
  try {
    // verify JWT
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;