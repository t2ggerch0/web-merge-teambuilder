const CreateGroupOptimal = require("./createGroup");
const CreateGroup = require("./createGroup");
const CreateGroupsGreedy = require("./createGroupsGreedy");

const CreateTeam = (users, edges, positionComposition, classId) => {
  // numGroups == users length / sum of positionComposition
  const numGroups = users.length / positionComposition.reduce((a, b) => a + b, 0);
  console.log("Num groups : ", numGroups);
  console.log("Position composition: ", positionComposition);
  if (numGroups === 0) {
    numGroups = 1;
  }
  const resultGreedy = CreateGroupsGreedy(users, edges, numGroups, positionComposition, classId);
  //console.log("Groups: ", resultGreedy);
  return resultGreedy;
};

const CreateTeamOptimal = (users, answers, teams, classId, questionIds, analyzedData) => {
  console.log("Position compositions: ", teams);
  console.log("class ids: ", classId);
  const result = CreateGroupOptimal(users, answers, teams, classId, questionIds, analyzedData);
  // console.log("groups: ", result.fullGroups);
  // console.log("full groups form condition id: ", result.fullGroupsFormConditionId);
  return result;
};

module.exports = { CreateTeam, CreateTeamOptimal };
