import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { Button } from "primereact/button"; // PrimeReact Button
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme

function HomePage() {
  const [mindMaps, setMindMaps] = useState([]);

  // Fetch all mind maps from the backend
  useEffect(() => {
    fetch("http://localhost:5001/api/mindmaps")
      .then((res) => res.json())
      .then((data) => setMindMaps(data))
      .catch((err) => console.error("Error fetching mind maps:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mind map?"
    );
    if (!confirmDelete) return;

    try {
      // logic for implementing delete mind map feature.
      const response = await fetch(`http://localhost:5001/api/mindmaps/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove deleted mind map from state
        setMindMaps(mindMaps.filter((map) => map._id !== id));
      } else {
        console.error("Failed to delete mind map");
      }
    } catch (error) {
      console.error("Error deleting mind map:", error);
    }
  };

  return (
    <>
      <TopNav />
      <div className="homepage-container">
        <main>
          <h1>Welcome Back, User!</h1>
          <p>Ready to create your next Mind Map?</p>

          <div className="mindmap-grid">
            {/* "Create New" Card */}
            <Link to="/new" className="mindmap-card create-new">
              <span>+</span>
              <p>Create New</p>
            </Link>

            {/* Render Existing Mind Maps */}
            {mindMaps.map((map) => (
              <div key={map._id} className="mindmap-card">
                <h3>{map.title}</h3>
                <p>{map.nodes.length} nodes</p>

                <div className="button-container">
                  <Link to={`/mindmap/${map._id}`} className="view-button">
                    View Mind Map
                  </Link>

                  {/* ✅ Delete Icon Button */}
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-text delete-button"
                    onClick={() => handleDelete(map._id)}
                    tooltip="Delete Mind Map"
                  />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
