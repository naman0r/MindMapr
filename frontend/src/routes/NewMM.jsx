import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase"; // ✅ Import Firebase auth
import TopNav from "../components/TopNav";
import { Button } from "primereact/button";

import "../styles/NewMM.css";
import { Editor } from "primereact/editor";

function NewMM() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Handle the form submission
  const handleGenerateMindMap = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!user) {
      alert("You must be logged in to create a mind map.");
      setLoading(false);
      return;
    }

    console.log("Sending Request with User ID:", user.uid); // ✅ Debugging step

    try {
      const response = await fetch(
        "http://localhost:5001/api/mindmaps/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notes,
            userId: user.uid, // ✅ Ensure userId is sent
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate mind map.");
      }

      console.log("Mind map created:", data);
      alert("Mind map generated successfully!");
      navigate("/"); // ✅ Redirect to homepage
    } catch (error) {
      console.error("Error generating mind map:", error);
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
        <form onSubmit={handleGenerateMindMap} className="new-mm-form">
          <Editor
            value={notes}
            onTextChange={(e) => setNotes(e.htmlValue)}
            style={{
              height: "550px",
              marginBottom: "20px",
            }}
          />
          <Button
            label={loading ? "Generating..." : "Generate Mind Map"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default NewMM;
