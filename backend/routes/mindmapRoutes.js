const express = require("express");
const router = express.Router();
const MindMap = require("../models/MindMap");

// @route GET /api/mindmaps
// @desc Get all mind maps
router.get("/", async (req, res) => {
  try {
    const mindmaps = await MindMap.find();
    res.json(mindmaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("POST request received"); // ✅ Log when the route is hit
  console.log("Request body:", req.body); // ✅ Log the request body

  const { title, nodes, edges } = req.body;

  try {
    const newMindMap = new MindMap({
      title,
      nodes,
      edges,
    });

    await newMindMap.save();
    res.status(201).json(newMindMap);
  } catch (err) {
    console.error("Error saving mind map:", err); // ✅ Log any errors
    res.status(400).json({ message: err.message });
  }
});

// @route PUT /api/mindmaps/:id
// @desc Update an existing mind map
router.put("/:id", async (req, res) => {
  const { title, nodes, edges } = req.body;

  try {
    const updatedMindMap = await MindMap.findByIdAndUpdate(
      req.params.id,
      { title, nodes, edges },
      { new: true }
    );

    if (!updatedMindMap) {
      return res.status(404).json({ message: "Mind map not found" });
    }

    res.json(updatedMindMap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/mindmaps/:id
// @desc Delete a mind map
router.delete("/:id", async (req, res) => {
  try {
    const deletedMindMap = await MindMap.findByIdAndDelete(req.params.id);

    if (!deletedMindMap) {
      return res.status(404).json({ message: "Mind map not found" });
    }

    res.json({ message: "Mind map deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
