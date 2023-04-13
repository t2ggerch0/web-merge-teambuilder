const createGroup = require("./createGroupUsingGraph/createGroupTest");
const createGraph = require("./createGraph/createGraph");
const getRandomUsers = require("./createGraph/createUsers");
const questions = require("../../data/DefaultQuestionLists.json").questions;

const users = getRandomUsers(10, questions);
for (let i = 0; i < users.length; i++) {
  console.log("user ", i + 1, users[i].answers);
}

createGraph(users);

createGroup();
