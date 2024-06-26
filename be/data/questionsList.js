const questionLists = [
  {
    id: 0,
    title: "Coding Experience(year)",
    options: ["0~1", "1~3", "3~5", "5~10", "10+"],
    weight: 5,
    countScore: "same",
  },
  {
    id: 1,
    title: "How much time to spend per week?",
    options: ["0~5", "5~10", "10~15", "15~20", "20+"],
    weight: 5,
    countScore: "same",
  },
  {
    id: 2,
    title: "Preferred Date and Time",
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    weight: 10,
    countScore: "same",
  },
  {
    id: 3,
    title: "Preferred Role",
    options: ["Leader", "Follower"],
    weight: 5,
    countScore: "different",
  },
];

module.exports = questionLists;
