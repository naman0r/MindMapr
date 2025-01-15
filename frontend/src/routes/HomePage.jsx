import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
  const [mindMaps, setMindMaps] = useState([]);

  // Fetch all mind maps from the backend
  useEffect(() => {
    fetch("http://localhost:5001/api/mindmaps")
      .then((res) => res.json())
      .then((data) => setMindMaps(data))
      .catch((err) => console.error("Error fetching mind maps:", err));
  }, []);

  return (
    <div className="homepage-container">
      <TopNav />

      <main>
        <h2>Welcome Back, User!</h2>
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
              <Link to={`/mindmap/${map._id}`} className="view-button">
                View Mind Map
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
