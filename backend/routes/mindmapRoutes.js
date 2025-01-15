/**
 * This file contains the API routes to handle CRUD operations (Create, Read, Update, Delete) for mind maps.
 */

const express = require("express");
const router = express.Router();
const MindMap = require("../models/MindMap");
const openai = require("openai");

// ✅ Initialize OpenAI API once
const openaiClient = new openai.OpenAIApi(
  new openai.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// ✅ @route POST /api/mindmaps/generate
// ✅ @desc Generate a mind map using OpenAI and save it to MongoDB
router.post("/generate", async (req, res) => {
  const { notes } = req.body;

  if (!notes) {
    return res.status(400).json({ message: "Notes are required" });
  }

  try {
    // 🧠 Send user notes to OpenAI API
    const completion = await openaiClient.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a mind map generator. Return a structured mind map in this JSON format:

          {
            "title": "string",
            "nodes": [
              { "id": "string", "label": "string" }
            ],
            "edges": [
              { "from": "string", "to": "string" }
            ]
          }

          All data must be valid JSON.`,
        },
        {
          role: "user",
          content: notes,
        },
      ],
    });

    // ✅ Check if the response is valid
    if (
      !completion.data ||
      !completion.data.choices ||
      completion.data.choices.length === 0
    ) {
      return res.status(500).json({ message: "Invalid response from OpenAI." });
    }

    // ✅ Parse the AI-generated mind map
    const mindMapData = completion.data.choices[0].message.content;

    let mindMapJson;
    try {
      mindMapJson = JSON.parse(mindMapData);
    } catch (err) {
      console.error("Error parsing mind map JSON:", err);
      return res
        .status(500)
        .json({ message: "Invalid mind map format from AI." });
    }

    // ✅ Validate mind map structure
    if (
      !mindMapJson.title ||
      !Array.isArray(mindMapJson.nodes) ||
      !Array.isArray(mindMapJson.edges)
    ) {
      return res.status(400).json({ message: "Invalid mind map structure." });
    }

    // ✅ Save the mind map to MongoDB
    const newMindMap = new MindMap(mindMapJson);
    await newMindMap.save();

    res.status(201).json(newMindMap);
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

module.exports = router;
