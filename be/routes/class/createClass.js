const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const User = require("../../models/User");
const Class = require("../../models/Class");
const Question = require("../../models/Question");
const verifyJwt = require("../../utils/verifyJwt");
const verifyUserType = require("../../utils/verifyUserType");

const questionLists = require("../../data/questionsList");

router.post("/create-class", verifyJwt, async (req, res) => {
  try {
    //------ Verify User ------//
    // Verify JWT
    const userId = req.userId;
    const user = await User.findById(userId);

    // add access keys for secret class
    let targetKey = 0;

    if (req.body.isSecret) {
      let keys = (await Class.find({}, "accessKey")).map((doc) => doc.accessKey);
      while (true) {
        const accessKey = Math.floor(Math.random() * 1000000);
        if (!keys.includes(accessKey)) {
          targetKey = accessKey;
          break;
        }
      }
    }

    //------ Verify Positions ------//
    // check if position types and composition are valid
    if (req.body.positionTypes.length !== req.body.positionComposition.length) {
      return res.status(403).json({ message: "Invalid position types and composition" });
    }

    // create position counts
    const positionCounts = [];
    for (let i = 0; i < req.body.positionTypes.length; i++) {
      positionCounts.push(0);
    }

    // check if host is participating
    if (req.body.isHostParticipating) {
      const hostPosition = req.body.hostPosition;

      // check if host position is one of the position types
      if (!req.body.positionTypes.includes(hostPosition)) {
        return res.status(403).json({ message: "Invalid host position" });
      }

      // add position counts of host position
      const hostPositionIndex = req.body.positionTypes.indexOf(hostPosition);
      positionCounts[hostPositionIndex] += 1;
    }

    //------ Create Questions ------//
    // check question ids are valid
    const questionIds = req.body.questionIds;
    for (let i = 0; i < questionIds.length; i++) {
      if (questionIds[i] < 0 || questionIds[i] >= questionLists.length) {
        return res.status(403).json({ message: "Invalid question id" });
      }
    }
    // create questions to class
    const questions = [];
    for (let i = 0; i < questionIds.length; i++) {
      const questionData = questionLists[questionIds[i]];

      // create question object
      const newQuestion = new Question({
        id: questionIds[i],
        title: questionData.title,
        options: questionData.options,
        weight: questionData.weight,
        countScore: questionData.countScore,
      });
      newQuestion.save();
      questions.push(newQuestion);
    }

    // Create the new class with the request data
    const newClass = new Class({
      host: userId,
      questions: questions,
      className: req.body.className,
      classType: req.body.classType,
      classDescription: req.body.classDescription,
      positionTypes: req.body.positionTypes,
      positionComposition: req.body.positionComposition,
      positionCounts: positionCounts,
      recruitStartDate: req.body.recruitStartDate,
      recruitEndDate: req.body.recruitEndDate,
      activityStartDate: req.body.activityStartDate,
      activityEndDate: req.body.activityEndDate,
      isSecret: req.body.isSecret,
      isHostParticipating: req.body.isHostParticipating,
      accessKey: targetKey,
    });

    // Save the new class to the database
    const savedClass = await newClass.save();

    // Add the new class to the host's list of classes

    user.classes.push(savedClass._id);
    await user.save();

    // Send a success response
    res.status(201).json({
      accessKey: savedClass.accessKey,
      classId: savedClass._id.toString(),
      message: "Class created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the class" });
  }
});

// example
/*
{
  "className": "Creating web application using pubilc API",
  "classType": "web",
  "classDescription": "This is a class about web development",
  "positionTypes": ["frontend", "backend"],
  "positionComposition": [2, 2],
  "hostPosition": "frontend",
  "recruitStartDate": "2021-05-01",
  "recruitEndDate": "2021-05-10",
  "activityStartDate": "2021-05-11",
  "activityEndDate": "2021-06-11",
  "isSecret": false,
  "isHostParticipating": true
  "questionIds": [0, 1, 2, 3]
}

*/
module.exports = router;
