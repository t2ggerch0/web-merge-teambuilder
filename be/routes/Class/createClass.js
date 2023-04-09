const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const Class = require("../../models/Class");

/**
 * @swagger
 * /classes:
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
 *             professorId:
 *               type: string
 *             matchingType:
 *               type: string
 *             customQuestions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                   priority:
 *                     type: number
 *     responses:
 *       200:
 *         description: The created class
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             professor:
 *               type: string
 *             students:
 *               type: array
 *               items:
 *                 type: string
 *             teams:
 *               type: array
 *               items:
 *                 type: string
 *             matchingType:
 *               type: string
 *             customQuestions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   options:
 *                     type: array
 *                     items:
 *                       type: string
 *                   priority:
 *                     type: number
 *       401:
 *         description: Not authorized to create class
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Unauthorized
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
    // Extract the JWT token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Check if the user is a professor
    const user = await User.findById(userId);
    if (user.userType !== "professor") {
      return res.status(403).json({ message: "Only professors can create a class" });
    }

    // Create the new class with the request data
    const newClass = new Class({
      professor: userId,
      students: req.body.students,
      teams: req.body.teams,
      matchingType: req.body.matchingType,
      customQuestions: req.body.customQuestions,
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
