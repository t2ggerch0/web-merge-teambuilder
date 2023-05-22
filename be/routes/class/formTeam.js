const express = require("express");
const router = express.Router();

const verifyJwt = require("../../utils/verifyJwt");
const dotenv = require("dotenv");
dotenv.config();

const verifyClassId = require("../../utils/verifyClassId");
const User = require("../../models/User");
const CreateGraph = require("../../utils/createGraph");
const CreateTeam = require("../../utils/createTeam");
const Answer = require("../../models/Answer");
const { all } = require("axios");
const Class = require("../../models/Class");
const CreateGroupsGreedy = require("../../utils/createGroupsGreedy");
const Team = require("../../models/Team");

router.post("/form-team", verifyJwt, async (req, res) => {
  try {
    // verify JWT
    const userId = req.userId;
    const user = await User.findById(userId);

    // verify class id
    const targetClass = await verifyClassId(req.body.classId);

    // check if user is host
    if (targetClass.host != userId) {
      return res.status(403).json({ message: "User is not host" });
    }

    // check if recruit end date past
    if (targetClass.recruitEndDate > Date.now()) {
      return res.status(403).json({ message: "Recruit end date did not pass" });
    }

    // check if team is already formed
    if (targetClass.teams.length > 0) {
      return res.status(403).json({ message: "Team is already formed" });
    }

    //====== Get Valid Guests ======//
    // get position composition
    const positionComposition = targetClass.positionComposition;

    // get position counts
    const positionCounts = targetClass.positionCounts;

    // get maximum number of teams
    let maxTeams = 0;
    for (let i = 0; i < positionComposition.length; i++) {
      teamNum = Math.floor(positionCounts[i] / positionComposition[i]);
      if (maxTeams < teamNum) {
        maxTeams = teamNum;
      }
    }

    console.log(targetClass);

    // get valid guest by time order
    const allGuests = targetClass.guest;
    const allAnswers = targetClass.answers;
    let validGuests = [];
    let validAnswers = [];
    let positionCounter = [];
    let maxPositionCounter = [];
    for (let i = 0; i < positionComposition.length; i++) {
      positionCounter.push(0);
      maxPositionCounter.push(positionComposition[i]);
    }

    // add valid guests
    for (let i = 0; i < allGuests.length; i++) {
      const guest = await User.findById(allGuests[i]);
      // update position counter
      const classIndex = guest.classes.indexOf(targetClass._id);
      const positionIndex = guest.positionIndexes[classIndex];

      if (positionCounter[positionIndex] < maxPositionCounter[positionIndex]) {
        validGuests.push(guest);
        // get answer of guest
        const answerObject = await Answer.findById(allAnswers[i]);
        validAnswers.push(answerObject);
        positionCounter[positionIndex] += 1;
      }
    }

    //====== Form Teams ======//
    // get question ids
    const questionIds = targetClass.questionIds;

    console.log("validGuests: ", validGuests);
    console.log("validAnswers: ", validAnswers);
    console.log("questionIds: ", questionIds);

    // create Graph
    let graph = CreateGraph(validGuests, validAnswers, questionIds);
    console.log(graph);

    // create team using graph
    let teams = CreateTeam(graph.guests, graph.edges, positionComposition);

    console.log("teams: ", teams);
    console.log(teams[0].length);

    //====== Create Teams ======//
    // create teams
    let teamLength = teams[0].length;
    for (let i = 0; i < teamLength; i++) {
      let team = teams[0];
      let members = [];
      for (let j = 0; j < teamLength; j++) {
        members.push(team[j]._id);
      }
      let teamObject = new Team({
        name: "Team " + (i + 1).toString(),
        class: targetClass._id,
        members: members,
      });
      await teamObject.save();
      await targetClass.teams.push(teamObject._id);
    }

    // save class
    await targetClass.save();

    // Send a success response
    res.status(201).json({ message: "Successfully formed a team" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

// example
/*
{
    "classId": "60b9b0b9b3b3b3b3b3b3b3b3",
}
*/