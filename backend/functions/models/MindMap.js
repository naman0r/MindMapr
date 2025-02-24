/**
 * In MongoDB, data is stored in documents (similar to rows in SQL).
 *  We need a schema to define the structure of a mind map document.
 * This is done using Mongoose.
 */

const mongoose = require("mongoose"); // import mongoose

// define the mind map schema
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
  userId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MindMap", MindMapSchema);
