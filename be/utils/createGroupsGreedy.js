function CreateGroupsGreedy(students, edges, numGroups) {
  const groupSize = Math.floor(students.length / numGroups);

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
    const srcGroup = findGroup(edge.from);
    const destGroup = findGroup(edge.to);

    if (srcGroup === -1 && destGroup === -1) {
      // Both students are unassigned
      let availableGroup = -1;
      let minSize = Infinity;
      groups.forEach((group, index) => {
        if (group.length < groupSize && group.length < minSize) {
          availableGroup = index;
          minSize = group.length;
        }
      });

      if (availableGroup !== -1) {
        groups[availableGroup].push(edge.from, edge.to);
      }
    } else if (srcGroup === -1 && destGroup !== -1) {
      // One student is unassigned and the other student is in a group
      if (groups[destGroup].length < groupSize) {
        groups[destGroup].push(edge.from);
      }
    } else if (srcGroup !== -1 && destGroup === -1) {
      // One student is in a group and the other student is unassigned
      if (groups[srcGroup].length < groupSize) {
        groups[srcGroup].push(edge.to);
      }
    }
  });

  // Assign unassigned students to the groups with the smallest number of members
  const unassignedStudents = students.map((s) => s.id).filter((s) => !groups.some((group) => group.includes(s)));

  unassignedStudents.forEach((student) => {
    let minGroupIndex = -1;
    let minGroupSize = Infinity;
    groups.forEach((group, index) => {
      if (group.length < groupSize && group.length < minGroupSize) {
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

module.exports = CreateGroupsGreedy;
