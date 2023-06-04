const CreateGroupsGreedy = require("./createGroupsGreedy");
const CreateGroupsGreedyOptimal = require("./createGroupsGreedyOptimal");

function calculateGroupWeight(group) {
  let groupWeight = 0;
  for (let i = 0; i < group.length; i++) {
    for (let j = i + 1; j < group.length; j++) {
      groupWeight += parseFloat(edgeMap.get(`${group[i]}_${group[j]}`)) || 0;
      //console.log(groupWeight);
    }
  }
  return groupWeight;
}

const CreateTeam = (users, edges, positionComposition, classId) => {
  // numGroups == users length / sum of positionComposition
  const numGroups = users.length / positionComposition.reduce((a, b) => a + b, 0);
  console.log("Num groups : ", numGroups);
  console.log("Position composition: ", positionComposition);
  if (numGroups === 0 ) {
    numGroups = 1;
  }
  const resultGreedy = CreateGroupsGreedy(users, edges, numGroups, positionComposition, classId);
  //console.log("Groups: ", resultGreedy);
  return resultGreedy;
};

const CreateTeamOptimal = (users, edges, teams, classId) => {
  console.log("Num groups : ", teams.length);
  console.log("Position compositions: ", teams);
  const numGroups = teams.length;
  const resultGreedy = CreateGroupsGreedyOptimal(users, edges, numGroups, teams, classId);
  return resultGreedy;
};

module.exports = { CreateTeam, CreateTeamOptimal };
