const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const verifyJwt = require("../../utils/verifyJwt");

const User = require("../../models/User");
const Class = require("../../models/Class");
const Team = require("../../models/Team");

router.get("/", verifyJwt, async (req, res) => {
  try {
    // // get User
    // const userId = req.userId;
    // let targetUser = await User.findById(userId);

    // // get class IDs
    // let { classId } = req.query;
    // console.log(classId);
    // let targetClass = await Class.findById(classId).populate("teams");
    // let teams = targetClass.teams;
    // console.log(teams);

    // // 팀 탐색
    // let targetTeam = null;
    // let isFound = false;
    // for (let i = 0; i < teams.length; i++) {
    //   if (isFound) {
    //     break;
    //   }

    //   console.log(teams[i].leader)
    //   console.log(targetUser._id)
    //   // // 리더 탐색
    //   // if (targetUser._id == teams[i].leader) {
    //   //   targetTeam = teams[i];
    //   //   break;
    //   // }

    //   // 멤버 탐색
    //   let members = teams[i].members;
    //   // console.log("members: ", members);
    //   // console.log("userId: ", userId);
    //   for (let j = 0; j < members.length; j++) {
    //     if (targetUser._id == members[j]) {
    //       targetTeam = teams[i];
    //       isFound = true;
    //       break;
    //     }
    //   }
    // }

    // if (!targetTeam) {
    //   return res.status(403).json({ message: "User has no team" });
    // }

    res.status(201).json({ "targetTeam": {
      "_id": "60c6f02b33e2cb92c0d0ab3f",
      "name": "Team A",
      "leader": "60c6e7c9c9e8435138136d20",
      "members": [
        "60c6e7c9c9e8435138136d20"
      ],
      "chat": [
        {
          "sender": "60c6e7c9c9e8435138136d20",
          "message": "Hello, team members!",
          "createdAt": "2023-05-08T12:00:00.000Z"
        }
      ]
    }});

    // let users = [];
    // users.push(targetTeam.members);
    // users.push(targetTeam.leader);
    
    // // targetTeam의 leader와 member의 이름과 포지션 배열 구하기
    // let namePositionPairs = [];
    // for (let i = 0; i < users.length; i++) {

    //   // 멤버 찾기
    //   let userId = users[i];
    //   let user = await User.findById(userId);

    //   // 특정 클래스의 유저의 포지션 타입 가져오기
    //   for (let j = 0; j < user.positionIndexByClass.length; j++) {
    //     if (user.positionIndexByClass[i].class == classId) {

    //       // 포지션 타입 가져오기
    //       let positionIndex = user.positionIndexByClass[i].positionIndex;
    //       let positionType = targetClass.positionTypes[positionIndex];

    //       namePositionPairs.push({ name: user.name, position: positionType });
    //       break;
    //     }

    //   }
    // }
    // res.status(201).json({ targetTeam, namePositionPairs });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
