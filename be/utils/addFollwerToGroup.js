const AddFollowerToGroup = (groups, followerIndexes, groupSizes, teams, followers, positionOfFollowers, positionCounter, conditionId, Condition) => {
  for (let i = 0; i < followers.length; i++) {
    let targetFollowerIndex = i;
    let positionIndex = positionOfFollowers[targetFollowerIndex];
    let availableGroup = -1;
    let minSize = Infinity;
    groups.forEach((group, index) => {
      if (
        groupSizes[index] < minSize &&
        teams.teams[index][positionIndex] > positionCounter[index][positionIndex] &&
        Condition(targetFollowerIndex, index, conditionId)
      ) {
        availableGroup = index;
        minSize = groupSizes[index];
      }
    });
    if (availableGroup !== -1) {
      //   groups[availableGroup].push(followers[i]);
      followerIndexes[availableGroup].push(i);
      //followers.pop(followers[i]);
      positionCounter[availableGroup][positionIndex] += 1;
    }
  }
};

module.exports = AddFollowerToGroup;
