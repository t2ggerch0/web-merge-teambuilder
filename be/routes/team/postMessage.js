const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const verifyJwt = require("../../utils/verifyJwt");

const Team = require("../../models/Team");

router.post('/message', verifyJwt, async (req, res) => {
  try {
    let userId = req.userId;
    let { message, teamId } = req.body;

    let team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // 메시지 생성
    let newMessage = {
      sender: userId,
      message,
    };
    team.chat.push(newMessage);
    await team.save();

    res.status(201).json({ newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;