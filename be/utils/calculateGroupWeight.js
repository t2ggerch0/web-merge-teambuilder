function calculateGroupWeight(group) {
  let groupWeight = 0;
  for (let i = 0; i < group.length; i++) {
    for (let j = i + 1; j < group.length; j++) {
      groupWeight += parseFloat(edgeMap.get(`${group[i]}_${group[j]}`)) || 0;
      //console.log(groupWeight);
    }
  }
  return groupWeight;
}
