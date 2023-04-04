const questions = require("../../../data/DefaultQuestionLists.json").questions;
const getRandomUsers = require("./createUsers");

const users = getRandomUsers(10, questions);
for (let i = 0; i < users.length; i++) {
  console.log("user ", i + 1, users[i].answers);
}

// Create a graph of connections between users
const graph = { nodes: [], edges: [] };

for (let i = 0; i < users.length; i++) {
  const userA = users[i];

  // Add a node for the user
  graph.nodes.push({ id: userA.id, label: `User ${userA.id}` });

  for (let j = i + 1; j < users.length; j++) {
    const userB = users[j];

    // Calculate the connection score between userA and userB
    let score = 0;

    for (const answerA of userA.answers) {
      const answerB = userB.answers.find((answer) => answer.questionTitle === answerA.questionTitle);

      if (answerB) {
        const question = questions.find((question) => question.title === answerA.questionTitle);

        if (question.scoringType === "single") {
          if (question.countScore === "same" && answerA.answerIndices[0] === answerB.answerIndices[0]) {
            score += question.weight;
          } else if (question.countScore === "different" && answerA.answerIndices[0] !== answerB.answerIndices[0]) {
            score += question.weight;
          }
        } else if (question.scoringType === "multi") {
          const commonAnswers = answerA.answerIndices.filter((index) => answerB.answerIndices.includes(index));
          if (commonAnswers.length > 0) {
            score += question.weight;
          }
        } else if (question.scoringType === "points") {
          const answerScoreA = answerA.answerIndices.reduce((sum, index) => sum + question.options.indexOf(question.options[index]), 0);
          const answerScoreB = answerB.answerIndices.reduce((sum, index) => sum + question.options.indexOf(question.options[index]), 0);
          const scoreDiff = Math.abs(answerScoreA - answerScoreB);
          score += (question.weight * (question.options.length - scoreDiff)) / question.options.length;
        }
      }
    }

    // Add an edge between userA and userB with the connection score as the label
    if (score > 0) {
      graph.edges.push({ from: userA.id, to: userB.id, label: score.toFixed(2) });
    }
  }
}

console.log(graph);
