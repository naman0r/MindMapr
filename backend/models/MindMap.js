const mongoose = require("mongoose");

const MindMapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  nodes: {
    type: Array,
    default: [],
  },
  edges: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MindMap", MindMapSchema);
