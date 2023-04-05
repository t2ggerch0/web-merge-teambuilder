// Draw the graph using vis.js
const container = document.getElementById("graph-container");
const data = { nodes: new vis.DataSet(graph.nodes), edges: new vis.DataSet(graph.edges) };

const options = {
  layout: {
    hierarchical: false,
    randomSeed: 2,
  },
  edges: {
    color: { highlight: "red" },
    width: 2,
    font: {
      size: 14,
      color: "#333",
      align: "middle",
    },
  },
  nodes: {
    shape: "dot",
    scaling: {
      min: 10,
      max: 30,
    },
    font: {
      size: 16,
      color: "#333",
      align: "middle",
    },
  },
};

const network = new vis.Network(container, data, options);
