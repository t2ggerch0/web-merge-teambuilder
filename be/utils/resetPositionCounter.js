function ResetPositionCounter(positionCounter, initPositionCounter, fullGroupIndex) {
  positionCounter = initPositionCounter.map((innerArray) => [...innerArray]);
  // delete full groups
  for (let i = 0; i < fullGroupIndex.length; i++) {
    positionCounter.splice(fullGroupIndex[i], 1);
  }
  console.log("return to init position counter", positionCounter);
}

module.exports = ResetPositionCounter;
