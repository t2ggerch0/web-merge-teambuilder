const getMaxPositionCounter = (positionCounter, positionComposition) => {
  let counterArray = positionCounter;
  // get positionCounter / positionComposition
  let rates = [];
  for (let i = 0; i < positionCounter.length; i++) {
    rates.push(positionCounter[i] / positionComposition[i]);
  }
  console.log("rates: ", rates);

  // get average of rates to int as max teams
  let average = 0;
  for (let i = 0; i < rates.length; i++) {
    average += rates[i];
  }
  average = Math.floor(average / rates.length);
  console.log("average: ", average);
  const maxTeams = average;

  if (average === 0) {
    maxTeams = 1;
  }

  // get min position composition per team
  let minPositionComposition = [];
  for (let i = 0; i < positionComposition.length; i++) {
    minPositionComposition.push(Math.floor(positionCounter[i] / maxTeams));
  }
  console.log("minPositionComposition: ", minPositionComposition);

  let teams = []; // Step 2

  for (let i = 0; i < maxTeams; i++) {
    // Step 3
    let team = []; // Step 3a

    for (let i = 0; i < positionComposition.length; i++) {
      team.push(minPositionComposition[i]); // Step 3b
    }

    teams.push(team); // Step 3f
  }

  for (let i = 0; i < counterArray.length; i++) {
    counterArray[i] -= minPositionComposition[i] * maxTeams;
  }

  // add left people to each team one by one
  for (let i = 0; i < counterArray.length; i++) {
    for (let j = 0; j < counterArray[i]; j++) {
      teams[j][i] += 1;
    }
  }

  // get sum of each position
  let maxPositionCounter = [];
  let totalGuests = 0;
  for (let i = 0; i < positionComposition.length; i++) {
    let sum = 0;
    for (let j = 0; j < maxTeams; j++) {
      sum += teams[j][i];
      totalGuests += teams[j][i];
    }
    maxPositionCounter.push(sum);
  }
  console.log("maxPositionCounter: ", maxPositionCounter);

  return { teams, maxPositionCounter, totalGuests }; // Step 4
};

module.exports = getMaxPositionCounter;
