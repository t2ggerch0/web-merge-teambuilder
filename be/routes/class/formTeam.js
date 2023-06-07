const express = require("express");
const router = express.Router();

const verifyJwt = require("../../utils/verifyJwt");
const dotenv = require("dotenv");
dotenv.config();

const verifyClassId = require("../../utils/verifyClassId");
const User = require("../../models/User");
const CreateGraph = require("../../utils/createGraph");
const { CreateTeam, CreateTeamOptimal } = require("../../utils/createTeam");
const Answer = require("../../models/Answer");
const { all } = require("axios");
const Class = require("../../models/Class");
const Team = require("../../models/Team");
const getMaxPositionCounter = require("../../utils/getMaxPositionCounter");
const AnalyzeData = require("../../utils/analyzeData");

router.post("/form-team", verifyJwt, async (req, res) => {
  try {
    // verify JWT
    const userId = req.userId;
    const user = await User.findById(userId);

    // verify class id
    const targetClass = await verifyClassId(req.body.classId, res);

    // check if user is host
    if (targetClass.host != userId) {
      return res.status(403).json({ message: "User is not host" });
    }

    // check if recruit end date past

    // test때 주석 처리
    // if (targetClass.recruitEndDate > Date.now()) {
    //   return res.status(403).json({ message: "Recruit end date did not pass" });
    // }

    // check if team is already formed
    if (targetClass.teams.length > 0) {
      return res.status(403).json({ message: "Team is already formed" });
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

    for (let i = 0; i < positionComposition.length; i++) {
      positionCounter.push(0);
    }

    optimalComposition = getMaxPositionCounter(positionCounts, positionComposition);
    console.log("optimalComposition: ", optimalComposition);

    // add host to guest if participating

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

    //====== Form Teams ======//
    // get question ids
    const questionIds = targetClass.questionIds;

    console.log("validGuests length: ", validGuests.length);
    // console.log("validAnswers: ", validAnswers);
    console.log("questionIds: ", questionIds);

    // create Graph
    let analyzedData = AnalyzeData(validGuests, validAnswers, questionIds);

    let teams;

    // create team using graph
    teams = await CreateTeamOptimal(validGuests, validAnswers, optimalComposition, targetClass._id, questionIds, analyzedData);

    // console.log("teams: ", teams);
    // console.log(teams[0].length);

    // //====== Create Teams ======//
    // // create teams
    // teamNum = teams.length;
    // console.log("Team num: ", teamNum);
    // let allTeamLengths = [];
    // for (let i = 0; i < teamNum; i++) {
    //   allTeamLengths.push(teams[i].length);
    // }
    // console.log("allTeamLengths: ", allTeamLengths);
    // for (let i = 0; i < teamNum; i++) {
    //   let team = teams[i];
    //   console.log("team: ", i, team);
    //   let members = [];
    //   for (let j = 0; j < allTeamLengths[i]; j++) {
    //     members.push(team[j]._id);
    //   }
    //   let teamObject = new Team({
    //     name: "Team " + (i + 1).toString(),
    //     class: targetClass._id,
    //     members: members,
    //   });

    //   // get position indexes of each members
    //   let positionIndexes = [];
    //   for (let j = 0; j < allTeamLengths[i]; j++) {
    //     const member = team[j];
    //     const classIndex = member.positionIndexByClass.findIndex((element) => {
    //       return element.class._id.toString() == targetClass._id.toString();
    //     });
    //     const positionIndex = member.positionIndexByClass[classIndex].positionIndex;
    //     positionIndexes.push(positionIndex);
    //   }
    //   console.log("object position indexes: ", positionIndexes);

    //   console.log(teamObject);
    //   await teamObject.save();
    //   await targetClass.teams.push(teamObject._id);
    // }

    // // save class
    // await targetClass.save();

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

/*
{
  "classId": "60b9b0b9b3b3b3b3b3b3b3b3",
  "deletedQuestionId" : 0
}
*/
