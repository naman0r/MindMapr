import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import "../styles/NewMM.css";

import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function NewMM() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle the form submission
  const handleGenerateMindMap = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/mindmaps/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notes }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate mind map.");
      }

      const data = await response.json();
      console.log("Mind map generated:", data);
      alert("Mind map generated successfully!");

      // Navigate to the newly created mind map
      navigate(`/mindmap/${data._id}`);
    } catch (error) {
      console.error("Error generating mind map:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TopNav />
      <div className="new-mindmap-container">
        <h2>Create a New Mind Map</h2>

        <form onSubmit={handleGenerateMindMap} className="mindmap-form">
          {/* ✅ PrimeReact Rich Text Editor */}
          <Editor
            value={notes}
            onTextChange={(e) => setNotes(e.htmlValue)}
            style={{ height: "550px", marginBottom: "20px" }}
          />

          {/* ✅ Generate Button */}
          <Button
            type="submit"
            label={loading ? "Generating..." : "Generate Mind Map"}
            icon="pi pi-cog"
            loading={loading}
            className="p-button-primary p-button-lg"
          />
        </form>
      </div>
    </div>
  );
}

export default NewMM;
