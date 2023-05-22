const CreateGroupsGreedy = require("./createGroupsGreedy");

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

const CreateTeam = (users, edges, positionComposition) => {
  // numGroups == users length / sum of positionComposition
  const numGroups = users.length / positionComposition.reduce((a, b) => a + b, 0);
  const resultGreedy = CreateGroupsGreedy(users, edges, numGroups);
  console.log("Groups: ", resultGreedy);
  return resultGreedy;
};

module.exports = CreateTeam;
