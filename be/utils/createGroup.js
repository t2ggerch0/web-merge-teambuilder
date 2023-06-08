const questionLists = require("../data/questionsList");
const AddFollowerToGroup = require("./addFollwerToGroup");
const CheckFullGroup = require("./checkFullGroup");
const ResetGroups = require("./resetGroups");
const ResetPositionCounter = require("./resetPositionCounter");

const Team = require("../models/Team");
const Class = require("../models/Class");
const Answer = require("../models/Answer");

function findPositionIndexOfStudent(student, classId) {
  const positionIndexByClass = student.positionIndexByClass;
  const positionIndex = positionIndexByClass.find((element) => {
    return element.class._id.toString() == classId.toString();
  }).positionIndex;
  return positionIndex;
}

const CreateGroupOptimal = async (guests, answers, teams, classId, questionIds, analyzedData) => {
  // verify data
  if (guests.length !== answers.length) {
    throw new Error("Invalid data");
  }
  // console.log("teams: ", teams);
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

  // HACK: 최종리더리스트
  let finalLeaders = [];

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

      // HACK: 최종리더리스트 삽입
      finalLeaders.push(leaders[i]);
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

      // HACK: 최종리더리스트 삽입
      finalLeaders.push(followers[i]);
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

  // console.log("teams: ", teams.teams);

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

  // HACK
  let teamArray = [];

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
    let fullGroupIndexes = await CheckFullGroup(groups, followerIndexes, fullGroups, fullGroupsFormConditionId, followers, teams, positionCounter, i);

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

  console.log("teams:", teams.teams);
  console.log("position counter: ", positionCounter);
  console.log("groupLength: " + groups.length);
  console.log("finalLeaders:", finalLeaders.length);

  console.log("prevTeamCount: ");
  for (let i = 0; i < fullGroups.length; i++) {
    console.log(fullGroups[i].length + " ");
  }
  console.log("prevTeamConditionId: " + fullGroupsFormConditionId);
  console.log("left followers: ", followers.length);


  // ================full Groups 처리================ //
  let targetClass = await Class.findById(classId);
  try {

    // 일단 남은 그룹들도 추가
    let prevFullGroupsSize = fullGroups.length;
    for (let i = 0; i < groups.length; i++) {
      fullGroupsFormConditionId.push(-1);
      fullGroups.push(groups[i]);
    }

    for (let i = 0; i < fullGroups.length; i++) {
      // 리더, 멤버 탐색
      let targetLeader = fullGroups[i].find(v => finalLeaders.includes(v));
      if (!targetLeader) throw (new Exception);
      let targetMembers = [];
      for (let k = 0; k < fullGroups[i].length; k++) {
        if (!finalLeaders.includes(fullGroups[i][k])) {
          targetMembers.push(fullGroups[i][k]);
        }
      }
      if (!targetMembers) throw (new Exception);
      let allUsers = [targetLeader, ...targetMembers];

      // 기존에 빌딩이 안된 그룹은 conditionId -1, isDirty
      let conditionId = fullGroupsFormConditionId[i];
      let isDirty = false;
      if (i >= prevFullGroupsSize) {
        conditionId = -1;
        isDirty = true;
      }

      // context 탐색
      let context = [];
      for (let j = 0; j < allUsers.length; j++) {
        let answer = await Answer.findOne({ class: targetClass, guest: allUsers[j] });
        positionIndex = allUsers[j].positionIndexByClass.find(
          (v) => String(v.class) === String(classId)
        );

        context.push({
          user: allUsers[j],
          answer: answer.answer,
          name: allUsers[j].name.toString(),
          positionIndex: positionIndex.positionIndex
        });
      }

      // Team 추가
      let teamObject = new Team({
        name: "UnnamedTeam",
        class: targetClass,
        leader: targetLeader,
        conditionId: conditionId,
        members: targetMembers,
        contextByUser: context,
        isDirty: isDirty
      });
      teamArray.push(teamObject);
    }
  } catch (error) {
    console.debug(error);
  }

  // ================left followers 처리================ //

  console.log("middleTeamArrayCount: ");
  for (let i = 0; i < teamArray.length; i++) {
    console.log(teamArray[i].contextByUser.length);
  }

  // 팀 별 추가된 follower의 포지션 인덱스
  let extraPosByTeam = [];
  teamArray.forEach(t => extraPosByTeam.push({ team: t, extraPos: null }));

  while (followers.length != 0) {
    let targetFollower = followers[0];

    // 팀의 총 인원수 기준 오름차순 정렬
    teamArray = teamArray.sort((a, b) => (a.contextByUser.length) - (b.contextByUser.length));

    // 팀배열 조회
    let isSucc = false;
    for (let i = 0; i < teamArray.length; i++) {
      // 성공 시 탈출
      if (isSucc) {
        break;
      }

      // 팀 별 추가된 follower의 포지션 조회
      for (let j = 0; j < extraPosByTeam.length; j++) {
        if (teamArray[i] === extraPosByTeam[j].team) {
          // 없다면 extraByTeam 마킹 및 follower 추가
          if (extraPosByTeam[j].extraPos == null) {
            extraPosByTeam[j].extraPos = targetFollower.positionIndexByClass.find(
              (v) => String(v.class) === String(classId)
            );
            isSucc = true;

            // contextByUser
            let answer = await Answer.findOne({ class: targetClass, guest: targetFollower });
            let positionIndex = targetFollower.positionIndexByClass.find(
              (v) => String(v.class) === String(classId)
            );
            let context = {
              user: targetFollower,
              answer: answer.answer,
              name: targetFollower.name.toString(),
              positionIndex: positionIndex.positionIndex
            };

            // follower 추가
            teamArray[i].contextByUser.push(context);
            teamArray[i].isDirty = true;
            teamArray[i].dirtyMembers.push(targetFollower);
          }
          // extra 원소가 하나일 때
          else if (!Array.isArray(extraPosByTeam[j].extraPos)) {
            // 다르다면 추가 및 마킹
            let targetFollowerPos = targetFollower.positionIndexByClass.find(
              (v) => String(v.class) === String(classId)
            );
            if (targetFollowerPos != extraPosByTeam[j].extraPos) {
              extraPosByTeam[j].extraPos = [extraPosByTeam[j].extraPos];
              extraPosByTeam[j].extraPos.push(targetFollowerPos);
              isSucc = true;

              // contextByUser
              let answer = await Answer.findOne({ class: targetClass, guest: targetFollower });
              let context = {
                user: targetFollower,
                answer: answer.answer,
                name: targetFollower.name.toString(),
                positionIndex: targetFollowerPos.positionIndex
              };

              // follower 추가
              teamArray[i].contextByUser.push(context);
              teamArray[i].isDirty = true;
              teamArray[i].dirtyMembers.push(targetFollower);
            }
          }
          // extra 원소가 두 개 이상일 때
          else {
            // 포함 안되어있다면 추가 및 마킹
            let targetFollowerPos = targetFollower.positionIndexByClass.find(
              (v) => String(v.class) === String(classId)
            );
            if (!extraPosByTeam[j].extraPos.includes(targetFollowerPos)) {
              extraPosByTeam[j].extraPos.push(targetFollowerPos);
              isSucc = true;

              // contextByUser
              let answer = await Answer.findOne({ class: targetClass, guest: targetFollower });
              let context = {
                user: targetFollower,
                answer: answer.answer,
                name: targetFollower.name.toString(),
                positionIndex: targetFollowerPos.positionIndex
              };

              // follower 추가
              teamArray[i].contextByUser.push(context);
              teamArray[i].isDirty = true;
              teamArray[i].dirtyMembers.push(targetFollower);
            }
          }

          break;
        }
      }
    }

    // teamArray 한바퀴 다 돌고도 자리 못찾으면 첫번째 자리에 넣음
    if (!isSucc) {
      // contextByUser
      let answer = await Answer.findOne({ class: targetClass, guest: targetFollower });
      let positionIndex = targetFollower.positionIndexByClass.find(
        (v) => String(v.class) === String(classId)
      );
      let context = {
        user: targetFollower,
        answer: answer.answer,
        name: targetFollower.name.toString(),
        positionIndex: positionIndex.positionIndex
      };

      // follower 추가
      teamArray[0].contextByUser.push(context);
      teamArray[0].isDirty = true;
      teamArray[0].dirtyMembers.push(targetFollower);
    }

    // 추가한 follower 제외
    followers.pop(targetFollower);
  }

  // DB 저장
  for (let i = 0; i < teamArray.length; i++) {
    await teamArray[i].save();
    targetClass.teams.push(teamArray[i]);
  }
  await targetClass.save();

  console.log("teamArrayCount: ");
  for (let i = 0; i < teamArray.length; i++) {
    console.log(teamArray[i].members.length + 1 + teamArray[i].dirtyMembers.length);
    console.log(teamArray[i].isDirty);
  }
  console.log("prevTeamConditionId: " + fullGroupsFormConditionId);
  console.log("left followers: ", followers.length);


  return { fullGroups, fullGroupsFormConditionId };
};

module.exports = CreateGroupOptimal;