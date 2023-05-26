const questionLists = require("../data/questionsList");

const CreateGraph = (guests, answers, questionIds) => {
  // verify data
  if (guests.length !== answers.length) {
    throw new Error("Invalid data");
  }

  // create graph
  let graph = { guests: [], edges: [] };
  for (let i = 0; i < guests.length; i++) {
    const guestA = guests[i];
    console.log("answers:", answers[i]);
    console.log(answers[i].answer);

    // add a node for the user
    graph.guests.push({ id: guestA });

    for (let j = i + 1; j < guests.length; j++) {
      const guestB = guests[j];

      // calculate the connection score between guestA and guestB
      let score = 0;

      for (let k = 0; k < questionIds.length; k++) {
        const weight = questionLists[k].weight;
        const countScore = questionLists[k].countScore;

        const answerA = answers[i].answer[k];
        const answerB = answers[j].answer[k];

        if (countScore === "same" && answerA === answerB) {
          score += weight;
        }
        if (countScore === "different" && answerA !== answerB) {
          score += weight;
        }
      }

      // add an edge between guestA and guestB
      graph.edges.push({
        from: guestA,
        to: guestB,
        weight: score,
      });
    }
  }
  return graph;
};

module.exports = CreateGraph;
