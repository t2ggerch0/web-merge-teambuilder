function findPositionIndexOfStudent(student, classId) {
  const positionIndexByClass = student.positionIndexByClass;
  const positionIndex = positionIndexByClass.find((element) => {
    return element.class._id.toString() == classId.toString();
  }).positionIndex;
  return positionIndex;
}

function CreateGroupsGreedyOptimal(students, edges, numGroups, teams, classId) {
  let groupSizes = [];
  for (let i = 0; i < teams.length; i++) {
    // add all the positions in the team
    let teamSize = 0;
    for (let j = 0; j < teams[i].length; j++) {
      teamSize += teams[i][j];
    }
    groupSizes.push(teamSize);
  }
  //console.log("students: ", students);
  // console.log("test position index: ", findPositionIndexOfStudent(students[0].id, classId));

  // set position counter for each group
  let positionCounter = [];
  for (let i = 0; i < numGroups; i++) {
    let positionCounterPerGroup = [];
    for (let j = 0; j < teams[0].length; j++) {
      positionCounterPerGroup.push(0);
    }
    positionCounter.push(positionCounterPerGroup);
  }

  console.log("positionCounter: ", positionCounter);

  // Sort edges in descending order by weight
  const sortedEdges = edges.sort((a, b) => b.weight - a.weight);

  // Initialize groups
  const groups = Array.from({ length: numGroups }, () => []);

  // Helper function to find the group index of a student
  function findGroup(studentId) {
    return groups.findIndex((group) => group.includes(studentId));
  }

  // console.log(sortedEdges);

  // Iterate through sorted edges and try to place students into groups
  sortedEdges.forEach((edge) => {
    console.log("positionCounter: ", positionCounter);

    //console.log("edge: ", edge);
    const srcGroup = findGroup(edge.from);
    const destGroup = findGroup(edge.to);
    console.log("srcGroup: ", srcGroup);

    if (srcGroup === -1 && destGroup === -1) {
      // Both students are unassigned
      let availableGroup = -1;
      let minSize = Infinity;
      groups.forEach((group, index) => {
        if (
          group.length < groupSizes[index] &&
          group.length < minSize &&
          positionCounter[index][findPositionIndexOfStudent(edge.from, classId)] < teams[index][findPositionIndexOfStudent(edge.from, classId)]
        ) {
          availableGroup = index;
          minSize = group.length;
        }
      });

      if (availableGroup !== -1) {
        groups[availableGroup].push(edge.from, edge.to);
        positionCounter[availableGroup][findPositionIndexOfStudent(edge.from, classId)] += 1;
        console.log("case 1");
      }
    } else if (srcGroup === -1 && destGroup !== -1) {
      // One student is unassigned and the other student is in a group
      if (
        groups[destGroup].length < groupSizes[destGroup] &&
        positionCounter[destGroup][findPositionIndexOfStudent(edge.from, classId)] < teams[destGroup][findPositionIndexOfStudent(edge.from, classId)]
      ) {
        groups[destGroup].push(edge.from);
        positionCounter[destGroup][findPositionIndexOfStudent(edge.from, classId)] += 1;
        console.log("case 2");
      }
    } else if (
      srcGroup !== -1 &&
      destGroup === -1 &&
      positionCounter[srcGroup][findPositionIndexOfStudent(edge.to, classId)] < teams[srcGroup][findPositionIndexOfStudent(edge.to, classId)]
    ) {
      // One student is in a group and the other student is unassigned
      if (groups[srcGroup].length < groupSizes[srcGroup]) {
        groups[srcGroup].push(edge.to);
        positionCounter[srcGroup][findPositionIndexOfStudent(edge.to, classId)] += 1;
        console.log("case 3");
      }
    }
  });

  // Assign unassigned students to the groups with the smallest number of members
  const unassignedStudents = students.map((s) => s.id).filter((s) => !groups.some((group) => group.includes(s)));
  console.log("unassignedStudents: ", unassignedStudents);
  unassignedStudents.forEach((student) => {
    let minGroupIndex = -1;
    let minGroupSize = Infinity;
    groups.forEach((group, index) => {
      if (group.length < groupSizes[index] && group.length < minGroupSize) {
        minGroupIndex = index;
        minGroupSize = group.length;
      }
    });

    if (minGroupIndex !== -1) {
      groups[minGroupIndex].push(student);
    }
  });

  return groups;
}

module.exports = CreateGroupsGreedyOptimal;
