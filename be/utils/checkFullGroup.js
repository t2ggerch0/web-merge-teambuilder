function CheckFullGroup(groups, followerIndexes, fullGroups, fullGroupsFormConditionId, followers, teams, positionCounter, conditionId) {
  let fullGroupIndexes = [];
  for (let i = 0; i < positionCounter.length; i++) {
    let isFull = true;
    for (let j = 0; j < positionCounter[i].length; j++) {
      if (positionCounter[i][j] < teams.teams[i][j]) {
        isFull = false;
      }
    }
    if (isFull) {
      console.log("team has been created");
      fullGroupsFormConditionId.push(conditionId);
      fullGroupIndexes.push(i);
      // add followers to groups
      for (let j = 0; j < followerIndexes[i].length; j++) {
        console.log("push members");
        groups[i].push(followers[followerIndexes[i][j]]);
      }
      // delete followers from followers array
      for (let j = 1; j < groups[i].length; j++) {
        console.log("pop members");
        followers.pop(groups[i][j]);
      }
      console.log("left members: ", followers.length);
      // 리더를 추가하는 코드도 필요
      fullGroups.push(groups[i]);
      // delete positionCounter[i]
      positionCounter.splice(i, 1);
      // delete groups[i]
      groups.splice(i, 1);
      // delete teams.teams[i]
      teams.teams.splice(i, 1);
      console.log("position counter: ", positionCounter);
    }
  }
  //console.log("full groups: ", fullGroups);
  return fullGroupIndexes;
}

module.exports = CheckFullGroup;
