const questionLists = require("../data/questionsList");

const AnalyzeData = (guests, answers, questionIds) => {
  // find the number of questions
  const numQuestions = questionIds.length;
  console.log("answer length", answers.length);

  // sort by leader and follower
  // get guests with same answer for each question

  // Q1
  let experiences = [0, 0, 0, 0, 0];
  for (let i = 0; i < guests.length; i++) {
    experiences[answers[i].answer[0]] += 1;
  }
  console.log("experiences", experiences);

  // Q2
  let timeSpend = [0, 0, 0, 0, 0];
  for (let i = 0; i < guests.length; i++) {
    timeSpend[answers[i].answer[1]] += 1;
  }
  console.log("timeSpend", timeSpend);

  // Q3
  let preferredTime = [];
  for (let i = 0; i < 20; i++) {
    preferredTime.push(0);
  }
  for (let i = 0; i < guests.length; i++) {
    for (let j = 0; j < answers[i].answer[2].length; j++) {
      preferredTime[answers[i].answer[2][j]] += 1;
    }
  }

  console.log("preferredTime", preferredTime);

  // Q4
  let preferredRole = [0, 0];
  for (let i = 0; i < guests.length; i++) {
    if (answers[i].answer[3] === 0) {
      preferredRole[0] += 1;
    } else {
      preferredRole[1] += 1;
    }
  }
  console.log("preferredRole", preferredRole);

  return {
    experiences: experiences,
    timeSpend: timeSpend,
    preferredTime: preferredTime,
    preferredRole: preferredRole,
  };
};

module.exports = AnalyzeData;
