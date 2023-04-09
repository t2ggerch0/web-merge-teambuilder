function createGroupIteration() {
  createStudentAndEdges();

  let edgeWeightTotal = 0;
  for (let i = 0; i < edges.length; i++) {
    edgeWeightTotal += parseInt(edges[i].weight);
  }
  const topEdges = edges.sort((a, b) => b.weight - a.weight).slice(0, 30);
  const sumOfTopEdgeWeights = topEdges.reduce((sum, edge) => sum + edge.weight, 0);

  let sumGreedy = 0;
  let sumHeuristic = 0;
  const numIterations = 10000;
  const edgeMap = new Map();

  for (let i = 0; i < numIterations; i++) {
    const resultGreedy = CreateGroupsGreedy(students, edges, numGroups);
    const resultHeuristic = CreateGroupsHeuristic(students, edges, numGroups);

    // Create a map for easy edge weight lookup

    edges.forEach((edge) => {
      edgeMap.set(`${edge.src}_${edge.dest}`, edge.weight);
      edgeMap.set(`${edge.dest}_${edge.src}`, edge.weight);
    });

    // Calculate total weight of each group in the result
    const groupWeightsGreedy = resultGreedy.map(calculateGroupWeight);
    const groupWeightsHeuristic = resultHeuristic.map(calculateGroupWeight);

    sumGreedy += groupWeightsGreedy.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    sumHeuristic += groupWeightsHeuristic.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  console.log("average of edges in graph: ", edgeWeightTotal / edges.length);
  console.log("average of edges in top 30: ", sumOfTopEdgeWeights / topEdges.length);
  console.log("average of edges in greedy algorithm: ", sumGreedy / (topEdges.length * numIterations));
  console.log("average of edges in heuristic algorithm: ", sumHeuristic / (topEdges.length * numIterations));
}

module.exports = createGroupIteration;
