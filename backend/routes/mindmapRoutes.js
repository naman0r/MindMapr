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
  const { notes, userId } = req.body;

  if (!notes || !userId) {
    return res.status(400).json({ message: "Notes and userId are required" });
  }

  try {
    const completion = await openaiClient.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a mind map generator. Based on the user's notes, generate a JSON object with two arrays: 'nodes' and 'edges'. The 'nodes' array should include objects with 'id' (unique identifier) and 'label' (text). The 'edges' array should include objects with 'from' and 'to' fields referencing node IDs from the 'nodes' array. As your role as a Mind Map generator, make sure to include some nodes with more detail, and don't diregard major information from the notes. Make it as detailed and well organized as possible. ",
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
      userId,
      createdAt: new Date(),
    });

    const savedMindMap = await newMindMap.save();

    res.status(201).json(savedMindMap); // Respond with the saved mind map
  } catch (err) {
    console.error("Error generating mind map:", err);
    res.status(500).json({ message: "Error generating mind map" });
  }
});

//  @route GET /api/mindmaps
//  @desc Get all mind maps
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }
    const mindmaps = await MindMap.find({ userId }); // filter by userId
    res.json(mindmaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  @route GET /api/mindmaps/:id
//  @desc Get a specific mind map by ID
router.get("/:id", async (req, res) => {
  const { userId } = req.query; // ✅ Get userId from query params

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  try {
    const mindmap = await MindMap.findById(req.params.id);

    if (!mindmap) {
      return res.status(404).json({ message: "Mind Map not found" });
    }

    if (mindmap.userId !== userId) {
      // ✅ Restrict access to the owner
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(mindmap);
  } catch (err) {
    console.error("Error fetching mind map:", err);
    res.status(500).json({ message: "Error fetching mind map" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query; // ✅ Expect userId in query params

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  try {
    const mindmap = await MindMap.findById(id);

    if (!mindmap) {
      return res.status(404).json({ message: "Mind Map not found" });
    }

    if (mindmap.userId !== userId) {
      //  Ensure user owns the mind map
      return res.status(403).json({ message: "Unauthorized" });
    }

    await mindmap.deleteOne();
    res.status(200).json({ message: "Mind Map deleted successfully" });
  } catch (err) {
    console.error("Error deleting mind map:", err);
    res.status(500).json({ message: "Error deleting mind map" });
  }
});

module.exports = router;
