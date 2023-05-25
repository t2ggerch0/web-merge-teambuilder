const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const verifyJwt = require("../../utils/verifyJwt");

const Class = require("../../models/Class");
const Team = require("../../models/Team");

router.get("/", verifyJwt, async (req, res) => {
  try {
    // get User
    const userId = req.userId;

    // get class IDs
    let { classId } = req.query;
    console.log(classId);
    let targetClass = await Class.findById(classId).populate("teams");
    let teams = targetClass.teams;

    // 팀 탐색
    let targetTeam = null;
    let isFound = false;
    for (let i = 0; i < teams.length; i++) {
      if (isFound) {
        break;
      }

      // 리더 탐색
      if (userId == teams[i].leader) {
        targetTeam = teams[i];
        break;
      }

      // 멤버 탐색
      let members = teams[i].members;
      console.log("members: ", members);
      console.log("userId: ", userId);
      for (let j = 0; j < members.length; j++) {
        if (userId == members[j]) {
          targetTeam = teams[i];
          isFound = true;
          break;
        }
      }
    }

    if (!targetTeam) {
      return res.status(403).json({ message: "User has no team" });
    }

    res.status(201).json({ targetTeam });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
