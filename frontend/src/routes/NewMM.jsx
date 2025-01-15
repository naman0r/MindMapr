import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

function NewMM() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateMindMap = async () => {
    try {
      const response = await fetch("http://localhost:5001/mindmaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: mindMapTitle,
          content: notesContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate mind map.");
      }

      const data = await response.json();
      console.log("Mind map generated:", data);
      alert("Mind map generated successfully!");
    } catch (error) {
      console.error("Error generating mind map:", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <TopNav />
      <div className="new-mindmap-container">
        <h2>Create a New Mind Map</h2>
        <form onSubmit={handleGenerateMindMap}>
          <textarea
            placeholder="Enter your session notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Mind Map"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewMM;
