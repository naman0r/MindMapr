/**
 * This file contains the API routes to handle CRUD operations (Create, Read, Update, Delete) for mind maps.
 */

const express = require("express");
const router = express.Router();
const MindMap = require("../models/MindMap");
const openai = require("openai");

//  Initialize OpenAI API once
const openaiClient = new openai.OpenAIApi(
  new openai.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

//  @route POST /api/mindmaps/generate
//  @desc Generate a mind map using OpenAI and save it to MongoDB
router.post("/generate", async (req, res) => {
  const { notes } = req.body;

  if (!notes) {
    return res.status(400).json({ message: "Notes are required" });
  }

  try {
    const completion = await openaiClient.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a mind map generator. Based on the user's notes, generate a JSON object with two arrays: 'nodes' and 'edges'. The 'nodes' array should include objects with 'id' (unique identifier) and 'label' (text). The 'edges' array should include objects with 'from' and 'to' fields referencing node IDs from the 'nodes' array.",
        },
        {
          role: "user",
          content: notes,
        },
      ],
    });

    let mindMapData = JSON.parse(completion.data.choices[0].message.content);

    // Transform edges from 'from' and 'to' to 'source' and 'target'
    mindMapData.edges = mindMapData.edges.map((edge) => ({
      source: edge.from,
      target: edge.to,
    }));

    // Save the generated mind map to MongoDB
    const newMindMap = new MindMap({
      title: mindMapData.nodes[0]?.label || "Untitled Mind Map", // Use the first node's label as the title
      nodes: mindMapData.nodes,
      edges: mindMapData.edges,
    });

    const savedMindMap = await newMindMap.save();

    res.status(201).json(savedMindMap); // Respond with the saved mind map
  } catch (err) {
    console.error("Error generating mind map:", err);
    res.status(500).json({ message: "Error generating mind map" });
  }
});

// ✅ @route GET /api/mindmaps
// ✅ @desc Get all mind maps
router.get("/", async (req, res) => {
  try {
    const mindmaps = await MindMap.find();
    res.json(mindmaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  @route GET /api/mindmaps/:id
//  @desc Get a specific mind map by ID
router.get("/:id", async (req, res) => {
  try {
    const mindmap = await MindMap.findById(req.params.id);
    if (!mindmap) {
      return res.status(404).json({ message: "Mind Map not found" });
    }
    res.json(mindmap);
  } catch (err) {
    console.error("Error fetching mind map:", err);
    res.status(500).json({ message: "Error fetching mind map" });
  }
});

module.exports = router;
