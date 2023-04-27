const express = require("express");
const router = express.Router();

const verifyJwt = require("../../utils/verifyJwt");
const dotenv = require("dotenv");
dotenv.config();

const verifyUserType = require("../../utils/verifyUserType");
const verifyClassId = require("../../utils/verifyClassId");

router.post("/end-question", verifyJwt, async (req, res) => {
  try {
    // verify JWT
    const userId = req.userId;

    // check if user is professor, return user if true
    await verifyUserType(userId, "professor");

    // verify class id
    const targetClass = await verifyClassId(req.body.classId);

    // check if user is professor of class
    if (targetClass.professor.toString() !== userId) {
      return res.status(403).json({ message: "User is not professor of class" });
    }

    // set endQuestion to true
    targetClass.endQuestion = true;
    await targetClass.save();

    // Send a success response
    res.status(201).json({ message: "Added Question Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
