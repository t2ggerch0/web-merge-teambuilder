const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");
const Class = require("../../models/Class");

const verifyJwt = require("../../utils/verifyJwt");
const verifyUserType = require("../../utils/verifyUserType");

router.post("/create-class", verifyJwt, async (req, res) => {
  try {
    // Verify JWT
    const userId = req.userId;

    // Check if the user is a professor. returns user if verified
    const user = verifyUserType(userId, "professor");

    // Create the new class with the request data
    const newClass = new Class({
      professor: userId,
      name: req.body.name,
      capacity: req.body.capacity,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    // Save the new class to the database
    await newClass.save();

    // Add the new class to the professor's list of classes
    user.classes.push(newClass._id);
    await user.save();

    // Send a success response
    res.status(201).json({
      classId: newClass._id.toString(),
      message: "Class created successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the class" });
  }
});

// example
/*
{
  "name": "Software Engineering"
}

*/
module.exports = router;