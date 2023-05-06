const questionLists = [
  {
    id: 0,
    title: "Coding Experience",
    options: ["0~1", "1~3", "3~5", "5~10", "10+"],
    isMandatory: false,
    weight: 5,
    countScore: "same",
  },
  {
    id: 1,
    title: "How much time to spend?",
    options: ["Extrovert", "Introvert"],
    isMandatory: false,
    weight: 5,
    countScore: "same",
  },
  {
    id: 2,
    title: "Preferred Date and Time",
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    isMandatory: false,
    weight: 10,
    countScore: "same",
  },
  {
    id: 3,
    title: "Preferred Role",
    options: ["Leader", "Follower"],
    isMandatory: false,
    weight: 5,
    countScore: "different",
  },
];

module.exports = questionLists;
