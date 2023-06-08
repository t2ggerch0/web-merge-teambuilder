const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const verifyJwt = require("../../utils/verifyJwt");

const Team = require("../../models/Team");

router.post('/todo', verifyJwt, async (req, res) => {
  try {
    let userId = req.userId;
    let { task, teamId, assignedTo } = req.body;

    let team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // 랜덤하고 유일한 ID 생성
    let newTodoId = Math.floor(Math.random() * Date.now()).toString();
    while (team.todos.some(todo => todo._id === newTodoId)) {
      newTodoId = Math.floor(Math.random() * Date.now()).toString();
    }

    // 할일 생성
    let newTodo = {
      _id: newTodoId,
      task,
      // assignedTo가 없을 경우 현재 사용자를 담당자로 설정
      assignedTo: assignedTo || [userId], 
      completed: false
    };
    team.todos.push(newTodo);
    await team.save();

    res.status(201).json({ newTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;