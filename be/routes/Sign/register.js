const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");

router.post("/register", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Check for duplicate emails
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ code: 0 });
    }

    // Encrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword, userType });

    return res.status(200).json({ code: 1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
