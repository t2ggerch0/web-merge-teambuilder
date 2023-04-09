function CreateGroupsHeuristic(students, edges, numGroups) {
  const groupSize = Math.floor(students.length / numGroups);

  // Sort edges in descending order by weight
  const sortedEdges = edges.sort((a, b) => b.weight - a.weight);

  // Initialize groups
  const groups = Array.from({ length: numGroups }, () => []);

  // Create edge map
  const edgeMap = new Map();
  edges.forEach((edge) => {
    const edgeKey = `${edge.src}_${edge.dest}`;
    edgeMap.set(edgeKey, edge.weight);
  });

  // Helper function to find the group index of a student
  function findGroup(studentId) {
    return groups.findIndex((group) => group.includes(studentId));
  }

  // Iterate through sorted edges and try to place students into groups
  sortedEdges.forEach((edge) => {
    const srcGroup = findGroup(edge.src);
    const destGroup = findGroup(edge.dest);

    if (srcGroup === -1 && destGroup === -1) {
      // Both students are unassigned
      let availableGroup = -1;
      let maxGroupWeight = -Infinity;
      groups.forEach((group, index) => {
        if (group.length < groupSize) {
          const groupWeight = group.reduce((acc, student) => {
            const edgeWeight = edgeMap.get(`${edge.src}_${student}`) || 0;
            return acc + edgeWeight;
          }, 0);
          if (groupWeight > maxGroupWeight) {
            availableGroup = index;
            maxGroupWeight = groupWeight;
          }
        }
      });

      if (availableGroup !== -1) {
        groups[availableGroup].push(edge.src, edge.dest);
      }
    } else if (srcGroup === -1 && destGroup !== -1) {
      // One student is unassigned and the other student is in a group
      if (groups[destGroup].length < groupSize) {
        let maxGroupWeight = -Infinity;
        let maxGroupIndex = -1;
        groups.forEach((group, index) => {
          if (group.length < groupSize) {
            const groupWeight = group.reduce((acc, student) => {
              const edgeWeight = edgeMap.get(`${edge.src}_${student}`) || 0;
              return acc + edgeWeight;
            }, 0);
            if (groupWeight > maxGroupWeight) {
              maxGroupIndex = index;
              maxGroupWeight = groupWeight;
            }
          }
        });
        if (maxGroupIndex !== -1) {
          groups[maxGroupIndex].push(edge.src);
        }
      }
    } else if (srcGroup !== -1 && destGroup === -1) {
      // One student is in a group and the other student is unassigned
      if (groups[srcGroup].length < groupSize) {
        let maxGroupWeight = -Infinity;
        let maxGroupIndex = -1;
        groups.forEach((group, index) => {
          if (group.length < groupSize) {
            const groupWeight = group.reduce((acc, student) => {
              const edgeWeight = edgeMap.get(`${edge.dest}_${student}`) || 0;
              return acc + edgeWeight;
            }, 0);
            if (groupWeight > maxGroupWeight) {
              maxGroupIndex = index;
              maxGroupWeight = groupWeight;
            }
          }
        });
        if (maxGroupIndex !== -1) {
          groups[maxGroupIndex].push(edge.dest);
        }
      }
    }
  });
  // Assign unassigned students to the groups with the highest total weight
  const unassignedStudents = students.map((s) => s.id).filter((s) => !groups.some((group) => group.includes(s)));

  unassignedStudents.forEach((student) => {
    let maxGroupIndex = -1;
    let maxGroupWeight = -Infinity;
    groups.forEach((group, index) => {
      if (group.length < groupSize) {
        const groupWeight = group.reduce((acc, member) => {
          const edgeWeight = edgeMap.get(`${student}_${member}`) || 0;
          return acc + edgeWeight;
        }, 0);
        if (groupWeight > maxGroupWeight) {
          maxGroupIndex = index;
          maxGroupWeight = groupWeight;
        }
      }
    });

    if (maxGroupIndex !== -1) {
      groups[maxGroupIndex].push(student);
    }
  });

  return groups;
}

module.exports = CreateGroupsHeuristic;
