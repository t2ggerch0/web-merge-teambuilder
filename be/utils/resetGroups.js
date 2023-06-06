function ResetGroups(groups, positionCounter) {
  groups = Array.from({ length: positionCounter.length }, () => []);
  console.log("reseted groups: ", groups);
}

module.exports = ResetGroups;
