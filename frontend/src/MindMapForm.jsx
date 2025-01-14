import React, { useState } from "react";

function MindMapForm() {
  const [title, setTitle] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMindMap = { title, nodes, edges };

    try {
      const response = await fetch("http://localhost:5001/api/mindmaps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMindMap),
      });

      const data = await response.json();
      console.log("Mind map created:", data);
    } catch (error) {
      console.error("Error creating mind map:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Mind Map</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Create Mind Map</button>
    </form>
  );
}

export default MindMapForm;
