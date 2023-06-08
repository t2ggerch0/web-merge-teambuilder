const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const verifyJwt = require("../../utils/verifyJwt");

const Team = require("../../models/Team");

router.delete('/todo/:todoId', verifyJwt, async (req, res) => {
  try {
    const { todoId } = req.params;
    const teamId = req.body.teamId;
    
    let team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    const todoIndex = team.todos.findIndex(todo => todo._id === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    team.todos.splice(todoIndex, 1);
    await team.save();
    
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;