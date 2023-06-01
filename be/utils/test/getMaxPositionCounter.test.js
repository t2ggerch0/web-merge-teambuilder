const getMaxPositionCounter = require("../getMaxPositionCounter");

// test random cases (position Counter, position Composition) with random numbers
let iteration = 10;
for (let i = 0; i < iteration; i++) {
  let positionCounter = [];
  let positionComposition = [];
  let positionCounterLength = 3;

  // create random positionComposition
  for (let i = 0; i < positionCounterLength; i++) {
    let randomNum = Math.floor(Math.random() * 3 + 1);
    positionComposition.push(randomNum);
  }

  // create random positionCounter
  for (let i = 0; i < positionCounterLength; i++) {
    let randomNum = Math.floor(Math.random() * 20 + 0);
    positionCounter.push(randomNum + positionComposition[i]);
  }

  // get max position counter
  console.log(positionCounter, positionComposition);
  let result = getMaxPositionCounter(positionCounter, positionComposition);
  console.log("result: ", result.teams, result.maxPositionCounter);
}
