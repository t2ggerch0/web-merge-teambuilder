const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");
const Class = require("../../models/Class");

const verifyJwt = require("../../utils/verifyJwt");

/**
 * @swagger
 * /create-class:
 *   post:
 *     summary: Create a new class
 *     tags:
 *       - class
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: The class to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       201:
 *         description: Class created successfully
 *       403:
 *         description: Only professors can create a class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Only professors can create a class
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Internal server error
 */
router.post("/create-class", async (req, res) => {
  try {
    // Verify JWT
    const userId = verifyJwt(req, res);

    // Check if the user is a professor
    const user = await User.findById(userId);
    if (user.userType !== "professor") {
      return res.status(403).json({ message: "Only professors can create a class" });
    }

    // Create the new class with the request data
    const newClass = new Class({
      professor: userId,
      name: req.body.name,
    });

    // Save the new class to the database
    await newClass.save();

    // Add the new class to the professor's list of classes
    user.classes.push(newClass._id);
    await user.save();

    // Send a success response
    res.status(201).json({ message: "Class created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the class" });
  }
});

module.exports = router;