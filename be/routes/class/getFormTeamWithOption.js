const express = require("express");
const router = express.Router();

const verifyJwt = require("../../utils/verifyJwt");
const dotenv = require("dotenv");
dotenv.config();

const verifyClassId = require("../../utils/verifyClassId");
const User = require("../../models/User");
const CreateGraph = require("../../utils/createGraph");
const { CreateTeam } = require("../../utils/createTeam");
const Answer = require("../../models/Answer");
const { all } = require("axios");
const Class = require("../../models/Class");
const CreateGroupsGreedy = require("../../utils/createGroupsGreedy");
const Team = require("../../models/Team");
const getMaxPositionCounter = require("../../utils/getMaxPositionCounter");
const { CreateTeamOptimal } = require("../../utils/createTeam");

router.get("/form-team-with-option", verifyJwt, async (req, res) => {
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

    //====== Get Valid Guests ======//
    // get position composition
    const positionComposition = targetClass.positionComposition;

    // get position counts
    const positionCounts = targetClass.positionCounts;

    // console.log(targetClass);

    // get valid guest by time order
    const allGuests = targetClass.guest;
    let validGuests = [];
    let validAnswers = [];
    let positionCounter = [];
    let maxPositionCounter = [];
    console.log("total guests: ", allGuests.length);
    console.log("Position counts: ", positionCounts);

    let optimalComposition;
    // check if using optimal team forming composition
    if (req.body.optimalComposition === true) {
      for (let i = 0; i < positionComposition.length; i++) {
        positionCounter.push(0);
      }

      optimalComposition = getMaxPositionCounter(positionCounts, positionComposition);
      console.log("optimalComposition: ", optimalComposition);

      // add valid guests
      for (let i = 0; i < optimalComposition.totalGuests; i++) {
        const guest = await User.findById(allGuests[i].user);
        console.log("guest position index: ", guest.positionIndexByClass);

        // update position counter
        const classIndex = guest.positionIndexByClass.findIndex((element) => {
          //console.log(element.class._id.toString(), targetClass._id.toString());
          return element.class._id.toString() == targetClass._id.toString();
        });

        const positionIndex = guest.positionIndexByClass[classIndex].positionIndex;
        console.log(positionIndex);

        if (positionCounter[positionIndex] < optimalComposition.maxPositionCounter[positionIndex]) {
          validGuests.push(guest);
          // get answer of guest
          const answerObject = await Answer.findById(allGuests[i].answer);
          validAnswers.push(answerObject);
          positionCounter[positionIndex] += 1;
        }
      }
    } else {
      // get maximum number of teams
      let maxTeams = 10000;
      for (let i = 0; i < positionComposition.length; i++) {
        teamNum = Math.floor(positionCounts[i] / positionComposition[i]);
        if (maxTeams > teamNum) {
          maxTeams = teamNum;
        }
      }
      for (let i = 0; i < positionComposition.length; i++) {
        positionCounter.push(0);
        maxPositionCounter.push(positionComposition[i] * maxTeams);
      }
      console.log("max position counter: ", maxPositionCounter);

      // add valid guests
      for (let i = 0; i < allGuests.length; i++) {
        const guest = await User.findById(allGuests[i].user);
        //console.log(guest.positionIndexByClass);
        // update position counter
        const classIndex = guest.positionIndexByClass.findIndex((element) => {
          //console.log(element.class._id.toString(), targetClass._id.toString());
          return element.class._id.toString() == targetClass._id.toString();
        });

        const positionIndex = guest.positionIndexByClass[classIndex].positionIndex;

        //console.log("guest position index: ", positionIndex);

        if (positionCounter[positionIndex] < maxPositionCounter[positionIndex]) {
          validGuests.push(guest);
          // get answer of guest
          const answerObject = await Answer.findById(allGuests[i].answer);
          validAnswers.push(answerObject);
          positionCounter[positionIndex] += 1;
        }
      }
    }
    //====== Form Teams ======//
    // get question ids
    const questionIds = targetClass.questionIds;

    console.log("validGuests length: ", validGuests.length);
    // console.log("validAnswers: ", validAnswers);
    console.log("questionIds: ", questionIds);

    // delete question
    if (req.body.deletedQuestionId != 0) {
      const deletedQuestionId = req.body.deletedQuestionId;
      const deletedQuestionIndex = questionIds.indexOf(deletedQuestionId);
      questionIds.splice(deletedQuestionIndex, 1);
      console.log("deleted question id: ", deletedQuestionId);
      console.log("deleted question index: ", deletedQuestionIndex);
      console.log("questionIds: ", questionIds);
    }

    // create Graph
    let graph = CreateGraph(validGuests, validAnswers, questionIds);
    // console.log(graph);

    let teams;
    if (req.body.optimalComposition === true) {
      console.log("forming team using optimal composition");
      teams = CreateTeamOptimal(graph.guests, graph.edges, optimalComposition.teams, targetClass._id);
    } else {
      console.log("forming team without optimal composition");
      // create team using graph
      teams = CreateTeam(graph.guests, graph.edges, positionComposition, targetClass._id);
    }

    //====== Create Teams ======//
    // create teams
    teamNum = teams.length;
    console.log("Team num: ", teamNum);
    let allTeamLengths = [];
    for (let i = 0; i < teamNum; i++) {
      allTeamLengths.push(teams[i].length);
    }
    console.log("allTeamLengths: ", allTeamLengths);
    for (let i = 0; i < teamNum; i++) {
      let team = teams[i];
      console.log("team: ", i, team);
      let members = [];
      for (let j = 0; j < allTeamLengths[i]; j++) {
        members.push(team[j]._id);
      }
      let teamObject = new Team({
        name: "Team " + (i + 1).toString(),
        class: targetClass._id,
        members: members,
      });

      // get position indexes of each members
      let positionIndexes = [];
      for (let j = 0; j < allTeamLengths[i]; j++) {
        const member = team[j];
        const classIndex = member.positionIndexByClass.findIndex((element) => {
          return element.class._id.toString() == targetClass._id.toString();
        });
        const positionIndex = member.positionIndexByClass[classIndex].positionIndex;
        positionIndexes.push(positionIndex);
      }
      console.log("object position indexes: ", positionIndexes);

      console.log(teamObject);
      await targetClass.teams.push(teamObject._id);
    }

    // return team object as response
    res.status(201).json({ teams });
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
    "optimalComposition": true,
    "deletedQuestionId" : 0
}
*/
