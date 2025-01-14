import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";

function MindMapForm() {
  const [title, setTitle] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [mindMaps, setMindMaps] = useState([]);

  // Fetch mind maps from the backend
  useEffect(() => {
    fetch("http://localhost:5001/api/mindmaps")
      .then((response) => response.json())
      .then((data) => {
        setMindMaps(data);
      })
      .catch((error) => console.error("Error fetching mind maps:", error));
  }, []);

  // Handle form submission
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

      // Update the list of mind maps
      setMindMaps((prevMindMaps) => [...prevMindMaps, data]);
    } catch (error) {
      console.error("Error creating mind map:", error);
    }
  };

  // Handle delete request
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/mindmaps/${id}`, {
        method: "DELETE",
      });

      // Update the list of mind maps
      setMindMaps((prevMindMaps) =>
        prevMindMaps.filter((map) => map._id !== id)
      );
    } catch (error) {
      console.error("Error deleting mind map:", error);
    }
  };

  return (
    <div>
      <TopNav />
      <div>
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

        <h2>Mind Maps</h2>
        <ul>
          {mindMaps.map((map) => (
            <li key={map._id}>
              <strong>{map.title}</strong>
              <button onClick={() => handleDelete(map._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MindMapForm;
