const CreateGroupsGreedy = require("./greedyAlgorithm");
const CreateGroupsHeuristic = require("./heuristicAlgorithm");

// ------ Variables ------ //
let minWeight = 1;
let maxWeight = 100;
let studentsLength = 22;
const numGroups = 5;

let students = [
  // Add your students here, with the format { id: unique_student_id }
];
let edges = [
  // Add your edges here, with the format { from: student1.id, to: student2.id, weight: value }
];

const edgeMap = new Map();

// ------ Functions ------ //
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createStudentAndEdges() {
  // create students
  for (let i = 0; i < studentsLength; i++) {
    students.push({ id: students.length + 1 });
  }

  // create edges
  for (let i = 0; i < students.length; i++) {
    for (let j = i + 1; j < students.length; j++) {
      const weight = getRandomNumber(minWeight, maxWeight);
      edges.push({ from: students[i].id, to: students[j].id, weight });
    }
  }
}

// Function to calculate the total weight of a group
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

// ------ Main ------ //
function createGroup(students, edges) {
  // createStudentAndEdges();
  //console.log(students, edges);

  let edgeWeightTotal = 0;
  for (let i = 0; i < edges.length; i++) {
    edgeWeightTotal += parseInt(edges[i].weight);
  }
  const topEdges = edges.sort((a, b) => b.weight - a.weight).slice(0, 30);
  const sumOfTopEdgeWeights = topEdges.reduce(
    (sum, edge) => sum + edge.weight,
    0
  );

  const resultGreedy = CreateGroupsGreedy(students, edges, numGroups);
  console.log("Groups: ", resultGreedy);

  // Create a map for easy edge weight lookup

  edges.forEach((edge) => {
    edgeMap.set(`${edge.from}_${edge.to}`, edge.weight);
    edgeMap.set(`${edge.to}_${edge.from}`, edge.weight);
  });

  //console.log(edgeMap);
  //Calculate total weight of each group in the result
  const groupWeightsGreedy = resultGreedy.map(calculateGroupWeight);
  console.log("Group weights: ", groupWeightsGreedy);

  const sumGreedy = groupWeightsGreedy.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  console.log("Edge weight Total: ", edgeWeightTotal);

  console.log("average of edges in graph: ", edgeWeightTotal / edges.length);
  console.log(
    "average of edges in top 30: ",
    sumOfTopEdgeWeights / topEdges.length
  );
  console.log(
    "average of edges in greedy algorithm: ",
    sumGreedy / topEdges.length
  );
}

module.exports = createGroup;
