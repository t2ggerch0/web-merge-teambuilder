const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../../models/User");

router.post("/verify", async (req, res) => {
  try {
    const { email, password, verifyCode, name} = req.body;

    // Check verify code
    const defaultUser = await User.findOne({ email }, { verifyCode: 1 });
    if (!defaultUser || defaultUser.verifyCode !== verifyCode) {
      return res.status(400).json({ code: 0, message: "invalid verify code" });
    }

    // Check for duplicate name
    const existingNameUser = await User.findOne({ name: name });
    if (existingNameUser) {
      return res.status(409).json({ code: 0, message: "duplicated name" });
    }

    // Update user.
    const hashedPassword = await bcrypt.hash(password, 10);
    defaultUser.password = hashedPassword;
    defaultUser.verifyCode = -1;
    defaultUser.name = name;
    defaultUser.studentId = studentId;
    defaultUser.major = major;
    await defaultUser.save();

    return res.status(200).json({ code: 1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
