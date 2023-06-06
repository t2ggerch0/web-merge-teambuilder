const questionLists = require("../data/questionsList");
const AddFollowerToGroup = require("./addFollwerToGroup");
const CheckFullGroup = require("./checkFullGroup");
const ResetGroups = require("./resetGroups");
const ResetPositionCounter = require("./resetPositionCounter");

function findPositionIndexOfStudent(student, classId) {
  const positionIndexByClass = student.positionIndexByClass;
  const positionIndex = positionIndexByClass.find((element) => {
    return element.class._id.toString() == classId.toString();
  }).positionIndex;
  return positionIndex;
}

const CreateGroupOptimal = (guests, answers, teams, classId, questionIds, analyzedData) => {
  // verify data
  if (guests.length !== answers.length) {
    throw new Error("Invalid data");
  }
  console.log("teams: ", teams);
  let numGroups = teams.teams.length;
  let groupSizes = [];
  for (let i = 0; i < numGroups; i++) {
    // add all the positions in the team
    let teamSize = 0;
    for (let j = 0; j < teams.teams[i].length; j++) {
      teamSize += teams.teams[i][j];
    }
    groupSizes.push(teamSize);
  }

  // set position counter for each group
  let positionCounter = [];

  for (let i = 0; i < numGroups; i++) {
    let positionCounterPerGroup = [];

    for (let j = 0; j < teams.teams[i].length; j++) {
      positionCounterPerGroup.push(0);
    }
    positionCounter.push(positionCounterPerGroup);
  }

  console.log("num groups: ", numGroups);
  console.log("group sizes: ", groupSizes);
  console.log("analyzedData: ", analyzedData);
  console.log("questionIds: ", questionIds);

  // Initialize groups
  let groups = Array.from({ length: numGroups }, () => []);

  // ==================== Leader data ==================== //
  // push leaders into group first
  let leaders = [];
  let followers = [];

  for (let i = 0; i < guests.length; i++) {
    console.log("answer to q: ", answers[i].answer[3]);
    if (answers[i].answer[3] === 0) {
      leaders.push(guests[i]);
    } else {
      followers.push(guests[i]);
    }
  }
  console.log("leaders length: ", leaders.length);
  console.log("followers length: ", followers.length);

  // get experience of leaders
  let experienceOfLeaders = [];
  for (let i = 0; i < leaders.length; i++) {
    experienceOfLeaders.push(answers[i].answer[0]);
  }

  // get position of leaders
  let positionOfLeaders = [];
  for (let i = 0; i < leaders.length; i++) {
    positionOfLeaders.push(findPositionIndexOfStudent(leaders[i], classId));
  }

  // get time spend of leaders
  let timeSpendOfLeaders = [];
  for (let i = 0; i < leaders.length; i++) {
    timeSpendOfLeaders.push(answers[i].answer[1]);
  }

  // get preferred time of leaders
  let preferredTimeOfLeaders = [];
  for (let i = 0; i < leaders.length; i++) {
    preferredTimeOfLeaders.push(answers[i].answer[2]);
  }

  console.log("leaders length: ", leaders.length);
  console.log("experienceOfLeaders: ", experienceOfLeaders);
  console.log("position of leaders: ", positionOfLeaders);
  console.log("time spend of leaders: ", timeSpendOfLeaders);
  console.log("preferred time of leaders: ", preferredTimeOfLeaders);

  let hasLeader = [];
  for (let i = 0; i < numGroups; i++) {
    hasLeader.push(false);
  }

  // push leaders to group if group position is available
  for (let i = 0; i < leaders.length; i++) {
    // let targetLeaderIndex = leaderCheckOrder[i];
    let positionIndex = positionOfLeaders[i];
    let experience = experienceOfLeaders[i];
    let availableGroup = -1;
    let minSize = Infinity;
    groups.forEach((group, index) => {
      if (groupSizes[index] < minSize && teams.teams[index][positionIndex] > positionCounter[index][positionIndex] && hasLeader[index] === false) {
        availableGroup = index;
        minSize = groupSizes[index];
      }
    });
    if (availableGroup !== -1) {
      groups[availableGroup].push(leaders[i]);
      positionCounter[availableGroup][positionIndex] += 1;

      hasLeader[availableGroup] = true;
      leaders.pop(leaders[i]);
    }
  }

  let leaderCheckOrder = [];
  // get experience of followers
  let experienceOfFollowers = [];
  for (let i = 0; i < followers.length; i++) {
    experienceOfFollowers.push(answers[i].answer[0]);
  }
  // get position of followers
  let positionOfFollowers = [];
  for (let i = 0; i < followers.length; i++) {
    positionOfFollowers.push(findPositionIndexOfStudent(followers[i], classId));
  }
  // push followers into group that has same time spend
  let timeSpendOfFollowers = [];
  for (let i = 0; i < followers.length; i++) {
    timeSpendOfFollowers.push(answers[i].answer[1]);
  }
  // push leader by order of experience
  for (let i = 4; i >= 0; i--) {
    for (let j = 0; j < followers.length; j++) {
      if (experienceOfFollowers[j] === i) {
        leaderCheckOrder.push(j);
      }
    }
  }

  // push one of follower as leader if group position is available by order of experience
  for (let i = 0; i < followers.length; i++) {
    let targetFollowerIndex = leaderCheckOrder[i];
    let positionIndex = positionOfFollowers[targetFollowerIndex];
    let availableGroup = -1;
    let minSize = Infinity;
    groups.forEach((group, index) => {
      if (groupSizes[index] < minSize && teams.teams[index][positionIndex] > positionCounter[index][positionIndex] && hasLeader[index] === false) {
        availableGroup = index;
        minSize = groupSizes[index];
      }
    });
    if (availableGroup !== -1) {
      groups[availableGroup].push(followers[i]);
      positionCounter[availableGroup][positionIndex] += 1;

      hasLeader[availableGroup] = true;
      followers.pop(followers[i]);
      positionOfFollowers.pop(positionOfFollowers[i]);
      experienceOfFollowers.pop(experienceOfFollowers[i]);
      timeSpendOfFollowers.pop(timeSpendOfFollowers[i]);
    }
  }

  console.log("position counter: ", positionCounter);
  // 리더들만 들어간 position counter
  const initPositionCounter = positionCounter.map((innerArray) => [...innerArray]);

  // ==================== Follower data ==================== //
  // add leaders that are not selected as followers
  for (let i = 0; i < leaders.length; i++) {
    followers.push(leaders[i]);
    positionOfFollowers.push(positionOfLeaders[i]);
    experienceOfFollowers.push(experienceOfLeaders[i]);
    timeSpendOfFollowers.push(timeSpendOfLeaders[i]);
    console.log("pop leaders");
  }
  console.log("followers length: ", followers.length);

  console.log("time spend of followers: ", timeSpendOfFollowers);

  console.log("position of followers: ", positionOfFollowers);

  console.log("experience of followers: ", experienceOfFollowers);

  // get preferred time of followers
  let preferredTimeOfFollowers = [];
  for (let i = 0; i < followers.length; i++) {
    preferredTimeOfFollowers.push(answers[i].answer[2]);
  }

  console.log("preferred time of followers: ", preferredTimeOfFollowers);

  // ======================== Add followers to group ======================== //

  console.log("teams: ", teams.teams);

  // 선호하는 시간대 체크하는 함수
  function checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index) {
    for (let i = 0; i < preferredTimeOfFollowers[targetFollowerIndex].length; i++) {
      for (let j = 0; j < preferredTimeOfLeaders[index].length; j++) {
        if (preferredTimeOfFollowers[targetFollowerIndex][i] === preferredTimeOfLeaders[index][j]) {
          return true;
        }
      }
    }
    return false;
  }

  function testConditions(targetFollowerIndex, index, conditionId) {
    switch (conditionId) {
      case 0:
        // match all
        return (
          timeSpendOfFollowers[targetFollowerIndex] === timeSpendOfLeaders[index] &&
          checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index) &&
          experienceOfFollowers[targetFollowerIndex] === experienceOfLeaders[index]
        );
      case 1:
        // match all lower condition
        return (
          // difference allowed by one
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] <= 1 &&
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] >= -1 &&
          experienceOfFollowers[targetFollowerIndex] - experienceOfLeaders[index] <= 1 &&
          experienceOfFollowers[targetFollowerIndex] - experienceOfLeaders[index] >= -1 &&
          // this should be exact
          checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index)
        );
      case 2:
        // match preferred time and experience
        return (
          checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index) &&
          experienceOfFollowers[targetFollowerIndex] === experienceOfLeaders[index]
        );
      case 3:
        // match preferred time and experience lower condition
        return (
          // difference allowed by one
          experienceOfFollowers[targetFollowerIndex] - experienceOfLeaders[index] <= 1 &&
          experienceOfFollowers[targetFollowerIndex] - experienceOfLeaders[index] >= -1 &&
          // this should be exact
          checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index)
        );
      case 4:
        // match preferred time and time spend
        return (
          checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index) &&
          timeSpendOfFollowers[targetFollowerIndex] === timeSpendOfLeaders[index]
        );
      case 5:
        // match preferred time and time spend lower condition
        return (
          // difference allowed by one
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] <= 1 &&
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] >= -1 &&
          // this should be exact
          checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index)
        );
      case 6:
        // match experience and time spend
        return (
          experienceOfFollowers[targetFollowerIndex] === experienceOfLeaders[index] && timeSpendOfFollowers[targetFollowerIndex] === timeSpendOfLeaders[index]
        );
      case 7:
        // match experience and time spend lower condition
        return (
          // difference allowed by one
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] <= 1 &&
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] >= -1 &&
          // this should be exact
          experienceOfFollowers[targetFollowerIndex] === experienceOfLeaders[index]
        );
      case 8:
        // match time spend
        return timeSpendOfFollowers[targetFollowerIndex] === timeSpendOfLeaders[index];
      case 9:
        // match time spend lower condition
        return (
          // difference allowed by one
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] <= 1 &&
          timeSpendOfFollowers[targetFollowerIndex] - timeSpendOfLeaders[index] >= -1
        );
      case 10:
        // match preferred time
        return checkPreferredTime(preferredTimeOfFollowers, preferredTimeOfLeaders, targetFollowerIndex, index);

      case 11:
        // match experience
        return experienceOfFollowers[targetFollowerIndex] === experienceOfLeaders[index];
      case 12:
        // match experience lower condition
        return (
          // difference allowed by one
          experienceOfFollowers[targetFollowerIndex] - experienceOfLeaders[index] <= 1 &&
          experienceOfFollowers[targetFollowerIndex] - experienceOfLeaders[index] >= -1
        );
      default:
        return false;
    }
  }

  let fullGroups = [];
  let fullGroupsFormConditionId = [];
  let fullGroupsIndex = [];

  //===================iterate test conditions======================//
  for (let i = 0; i < 13; i++) {
    console.log("\ncondition id: ", i);
    let followerIndexes = [];
    for (let j = 0; j < positionCounter.length; j++) {
      followerIndexes.push([]);
    }
    // console.log("follower indexes: ", followerIndexes);

    AddFollowerToGroup(groups, followerIndexes, groupSizes, teams, followers, positionOfFollowers, positionCounter, i, testConditions);
    console.log("teams: ", teams.teams);
    console.log("position counter", positionCounter);
    console.log("follower Indexes: ", followerIndexes);
    // check if any groups are full
    let fullGroupIndexes = CheckFullGroup(groups, followerIndexes, fullGroups, fullGroupsFormConditionId, followers, teams, positionCounter, i);

    // add full groups indexes to full groups index
    for (let j = 0; j < fullGroupIndexes.length; j++) {
      fullGroupsIndex.push(fullGroupIndexes[j]);
    }

    // reset position counter
    positionCounter = initPositionCounter.map((innerArray) => [...innerArray]);
    // delete full groups
    for (let i = 0; i < fullGroupsIndex.length; i++) {
      positionCounter.splice(fullGroupsIndex[i], 1);
    }
    console.log("return to init position counter", positionCounter);
    if (fullGroups.length === numGroups) {
      console.log("all teams set");
      break;
    }
  }

  console.log("left followers: ", followers.length);
  console.log("full groups form condition ids: ", fullGroupsFormConditionId);

  console.log("teams:", teams.teams);
  console.log("position counter: ", positionCounter);

  // ================Add left followers to groups================ //
  // 여기부터 해주세요
  if (followers.length > 0) {
    // 남은 사람들을 팀으로 배치
  }
  //=====================================================================================================//

  return { fullGroups, fullGroupsFormConditionId };
};

module.exports = CreateGroupOptimal;
