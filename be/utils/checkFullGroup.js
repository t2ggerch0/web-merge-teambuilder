const Team = require("../models/Team");
const Class = require("../models/Class");
const Answer = require("../models/Answer");

async function CheckFullGroup(groups, followerIndexes, fullGroups, fullGroupsFormConditionId, followers, teams, positionCounter, conditionId, classId, finalLeaders) {

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

      // HACK: 리더, 멤버 탐색
      let targetLeader = groups[i].find(v => finalLeaders.includes(v));
      let targetMembers = groups[i].filter(v => !finalLeaders.includes(v));
      let allUsers = [targetLeader, ...targetMembers];

      // HACK: contextByUser 탐색
      try {
        let targetClass = await Class.findById(classId);
        
        let context = [];
        for (let k = 0; k < allUsers.length; k++) {
          let answer = await Answer.findOne({ class: targetClass, guest: allUsers[k] });
          console.log("tDebug: " + allUsers[k].positionIndexByClass);
          let positionIndex = allUsers[k].positionIndexByClass.find(
            (v) => String(v.class) === String(classId)
          );

          context.push({
            user: allUsers[k],
            answer: answer.answer,
            name: allUsers[k].name.toString(),
            positionIndex: positionIndex.positionIndex
          });
          console.log("tDebug: " + context);
        }

        // HACK: Team 생성
        let teamObject = new Team({
          name: "UnnamedTeam",
          class: targetClass,
          leader: targetLeader,
          conditionId: conditionId,
          members: targetMembers,
          contextByUser: context
        });
        await teamObject.save();

        // HACK: Class에 저장
        targetClass.teams.push(teamObject);
        await targetClass.save();
        console.log("classSaved");

        fullGroups.push(groups[i]);
        // delete positionCounter[i]
        positionCounter.splice(i, 1);
        // delete groups[i]
        groups.splice(i, 1);
        // delete teams.teams[i]
        teams.teams.splice(i, 1);
        console.log("position counter: ", positionCounter);
      } catch (error) {
        console.error("답변 탐색 에러:", error);
      }
    }
  }
  //console.log("full groups: ", fullGroups);
  return fullGroupIndexes;
}

module.exports = CheckFullGroup;
