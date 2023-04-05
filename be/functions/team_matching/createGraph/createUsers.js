const getRandomUsers = (numUsers, questions) => {
  const users = [];
  for (let i = 1; i <= numUsers; i++) {
    const answers = [];

    for (const question of questions) {
      let answerIndices = [];

      if (question.scoringType === "multi") {
        // For questions with multiple answers, pick two distinct random answers
        const numAnswers = Math.min(question.options.length, 2);

        while (answerIndices.length < numAnswers) {
          const index = Math.floor(Math.random() * question.options.length);

          if (!answerIndices.includes(index)) {
            answerIndices.push(index);
          }
        }
      } else {
        // For questions with a single answer, pick one random answer
        answerIndices.push(Math.floor(Math.random() * question.options.length));
      }

      answers.push({ questionTitle: question.title, answerIndices });
    }

    users.push({ id: i, answers });
  }
  return users;
};

module.exports = getRandomUsers;
